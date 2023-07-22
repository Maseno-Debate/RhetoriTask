/**
* processSpeakers - gets list of speakers from the spreadsheet
* to prepare for placement
* @speakers_sheet: sheet that has speakers names
* Return: speakers (an array of speakers)
*/

function processSpeakers(speakers_sheet) {
  var speakers = [];
  var data = (speakers_sheet.getDataRange()).getValues();

  for (var i = 1; i < data.length; i++){
    var speaker = [];
    var speakerName = data[i][0];
    speaker.push(speakerName);
    speakers.push(speaker);
  }
  return speakers;
}

/**
* processJudges - gets object of judges and their respective experience levels
* @judges_sheet: sheet with judges details
* Return: judges (larray with judge objects with their names experience level codes 1, 2 or 3)
*/

function processJudges(judgeSheet){
  var judges =[];
  var data = (judgeSheet.getDataRange()).getValues();

  for (var i = 1; i < data.length; i++){
    var judge = [];
    var judgeName = data[i][0];
    var judgeLevel = data[i][1];

    if (judgeLevel == "Novice")
      judgeLevel = 1;
    else if(judgeLevel == "Intermediate")
      judgeLevel = 2;
    else if (judgeLevel == "Pro")
      judgeLevel = 3;
    else
      judgeLevel = 0;
    judge.push(judgeName);
    judge.push(judgeLevel);
    judges.push(judge);

  }
  return judges;
}


/**
* processRooms - chooses the rooms to be used in the round
* @roomsSheet: sheet with rooms data
* @roomsNumber: number of rooms needd for the round
* Return: rooms (array with the selected rooms and their codenames)
*/

function processRooms(roomsSheet, roomsNumber){
  var rooms = [];
  var data = (roomsSheet.getDataRange()).getValues();
  for (var i = 1; i <= roomsNumber; i++){
    var room = [];
    var roomNumb = data[i][0];
    //var codeName = data[i][1];
    room.push(roomNumb)//, codeName);

    rooms.push(room);
  }
  return rooms;
}

/**
* randomPlacement - distributes the speakers and judges at random in given rooms
* @speakers: list of speakers to be placed
* @judges: list of judges to be placed
* @rooms: list of rooms where speakers and judges are to be distributed
* Return: placement (object of rooms each with speakers and judges arrays)
*/

function randomPlacement(speakers, judges, rooms){
  var placement = [];
  var speakersPerRoom = Math.floor(speakers.length / rooms.length);
  var remainingSpeakers = speakers.length - (speakersPerRoom * rooms.length);
  var judgesPerRoom = Math.floor(judges.length / rooms.length);
  var remainingJudges = judges.length - (judgesPerRoom * rooms.length);
  var roomsNumber = rooms.length;
  
  for (var i = 0; i < roomsNumber; i++){
    var fullRoom = [];
    var room = [];
    var roomSpeakers = [];
    var roomJudges = [];

    
    for (var j = 0; j < speakersPerRoom; j++){
      var z = Math.floor(Math.random() * speakers.length);
      if (speakers[z]){
        var speaker = speakers[z];

        roomSpeakers.push(speaker);
        speakers.splice(speakers.indexOf(speaker), 1);
      }
      else{
        break;
      }
      
    }

    for (var k = 0; k < judgesPerRoom; k++){
      var y = Math.floor(Math.random() * judges.length);
      if (judges[y]){
        var judge = judges[y][0];

        //Logger.log(y);
        roomJudges.push(judge);
        judges.splice(judges.indexOf(judges[y]), 1);
      } 
      else{
        break;
      }
    }
    
    // Add the remaining speakers and judges to last room
    room.push(rooms[i]);
    fullRoom.push(room, roomSpeakers, roomJudges);
    placement.push(fullRoom);
  }

  SpreadsheetApp.getUi().alert(`Placement: ${placement} \nRemaining JUdges: ${judges} \nRemaining Speakers: ${speakers}`);
  if (remainingSpeakers > 0 || remainingJudges > 0){
    //var remainingPlacement = randomPlacement(speakers, judges, rooms);
    var p = 0;
    var u = 0;

    for (var n = 0; n < placement.length; n++){
        if (remainingSpeakers > 0){
          var speaker = speakers[p];
          placement[n][1].push(speaker);
          speakers.splice(speakers.indexOf(speaker), 1);
          p++;
          remainingSpeakers--;
        }
        if (remainingJudges > 0){
          var judge = judges[u];
          placement[n][2].push(judge);
          judges.splice(judges.indexOf(judge), 1);
          u++;
          remainingJudges--;
        }
    }
  }
  
  return placement;
}



/**
* createRound - creates a round sheet displaying the rooms each with their speakers and judges
* @placement: object with rooms, speakers and judges
* @roundNumber: the number of round of the placement to be made
*/

function createRound(placement, roundName){
  var currSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var newSheetName = roundName;
  
  var cellColor = "#b7e1cd";
  var headColor = "#e1b7b7";

  // Create a new sheet and get ref variable
  var newSheet = currSpreadsheet.insertSheet(newSheetName);
  var headers = ["Rooms", "Speakers", "Judges"];
  for (var x = 1; x <= headers.length; x++){
    var setCell = newSheet.getRange(1, x)
    setCell.setValue(headers[x - 1]);
    setCell.setBackground(headColor);
  }

  var roomRow = 2;
  var roomColumn = 1;
  var speakersRow = 2;
  var judgesRow = 2;
  var y = roomColumn;

  
  for (var i = 0; i < placement.length; i++){
    var roomName = placement[i][0];
    var judgeArr = placement[i][2];
    var speakersArr = placement[i][1];
    var judgeNumbers = judgeArr.length;
    var speakerNumbers = speakersArr.length;
    
    // Set value of room name
    var roomCell = newSheet.getRange(roomRow, roomColumn);
    roomCell.setValue(roomName);
    roomCell.setBackground(cellColor)

    
    
    // Set speakers in second column and subsequent rows(cells)
    for (var j = 0; j < speakersArr.length; j++){
      var speakerCell = newSheet.getRange(speakersRow, (y + 1));
      var currSpeaker = speakersArr[j];

      speakerCell.setValue(currSpeaker);
      speakerCell.setBackground(cellColor)
      speakersRow++;
    }

    // Set judges in third column and subsequent rows(cells)
    for (var k = 0; k < judgeArr.length; k++){
      var judgeCell = newSheet.getRange(judgesRow, (y + 2));
      var currJudge = judgeArr[k];

      judgeCell.setValue(currJudge);
      judgeCell.setBackground(cellColor);
      judgesRow++;
    }

    // Update room row value in prep for next key
    if (judgeNumbers >= speakerNumbers){
      roomRow += judgeNumbers + 1;
      speakersRow = roomRow;
      judgesRow = roomRow;
    }
    else if (speakerNumbers > judgeNumbers){
      roomRow += speakerNumbers + 1;
      speakersRow = roomRow;
      judgesRow = roomRow;
    }
    
  } 
}


/**
 * drawRound - draws the round
 * Return: 0 (success)
 */

function drawRound(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var roundName = sheet.getRange('B2').getValue();
  sheet.getRange('B2').clearContent();
  var numberRooms = sheet.getRange('B3').getValue();
  sheet.getRange('B3').clearContent();
  var speakerSheetName = sheet.getRange('B4').getValue();
  sheet.getRange('B4').clearContent();
  var judgeSheetName = sheet.getRange('B5').getValue();
  sheet.getRange('B5').clearContent();
  var roomSheetName = sheet.getRange('B6').getValue();
  sheet.getRange('B6').clearContent();

  if (roundName && numberRooms && speakerSheetName && judgeSheetName && roomSheetName){
    SpreadsheetApp.getUi().alert(`You have entere all the values, fantastic! the round name: ${roundName}, number rooms: ${numberRooms}, speaker sheet: ${speakerSheetName} judge sheet: ${judgeSheetName} & room sheet: ${roomSheetName}`);
    var speakersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(speakerSheetName);
    var judgeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(judgeSheetName);
    var roomSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(roomSheetName);
    
    if (speakersSheet && judgeSheet && roomSheet){
      var speakers = processSpeakers(speakersSheet); // Array of speakers needs to be object with experience levels
      var judges = processJudges(judgeSheet); // Array of judges and experience levels
      var rooms = processRooms(roomSheet, numberRooms); // Array rooms and their codenames

      const placement = randomPlacement(speakers, judges, rooms);

      createRound(placement, roundName);
    }
    else{
      SpreadsheetApp.getUi().alert(`The sheet names have an error`);
    }

    
  }
  else{
    SpreadsheetApp.getUi().alert("Sorry, You have to enter all the data needed. Make sure to do so!");
  }
}


/**
 * trial - for calling the other functions and testing while coding
 */
function trial(){
  var speakers = [["Speaker1", "JAMHURI"], ["Speaker2", "KABARAK"], ["Speaker3", "JUJA"]];
  var judges = [["JudgeA", 1], ["JudgeB", 2], ["JudgeC", 1]];
  var rooms = [["Room 1", "Menengai"], ["Room 2", "Kilimanjaro"]];
  var result = randomPlacement(speakers, judges, rooms);
  resultNo = result.length;
  Logger.log(result);
}
