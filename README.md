# RHETORITASK

Rhetoritask is a Flask web application that displays speaker rankings for public speaking tournaments. It retrieves data from a Google Spreadsheet used to tabulate the tournament results and presents the rankings in an easy-to-read format.

**DISCLAIMER:** Rhetoritask (this spreadsheet extension) is a temporary solution while I work on developing a full-fledged application with real-time data tabulation and advanced features. It serves as an interim solution until completion of the API integration.

## Features

- Displays speaker rankings from tournament data
- Retrieves data from a google spreadsheet
- Provides an intuitive user-friendly interface

## Installation

If you only wish to integrate your speech tournament data to be displayes on your website, I suggest you reach out to me via email.
Otherwise, follow the steps below. It might also be much easier for you to navigate if you are comfortable with spreadsheets.

1. Clone the project repository

    ```shell
    $ git clone https://github.com/B0mb37/rhetoritask.git
    ```

2. Change directory into project directory

    ```shell
    $ cd path/to/project
    ```

3. Create and activate virtual environment(optional but recommended):

    ```shell
    $ python3 -m venv venv
    $ source venv/bin/activate
    ```

4. Install the required dependencies:

    ```shell
    $ pip install -r requirements.txt
    ```

5. Set up your google spreadsheet credentials:

- Create a project on the [google cloud console](https://console.cloud.google.com)
- Enable googlesheets API for the project
- Download the credentials file and rename to `credentials.json` then add to the `rhetoritask/data` directory

6. Set up your google spreadsheet:
You can copy this [spreadsheet]() to your google account and go to instructions to now how to make use of it with this app.
Alternatively (recommended because I am yet to make public the fully scripted spreadsheet), you can create your own spreadsheet then:
    - Make sure it has a sheet called `Speaker Rankings`
    - The Speaker raning sheet must have columns as arranged below:
        | Speaker Name  | Round 1    | Round 2 | ..... | ...... | Average |
        | ------------- |:----------:|:-------:|:-----:|:------:|--------:|

    Make sure each round point per speaker is derived from the other worksheets and the average calculated by formula below:

***NOTE:***Do not forget to sort the sheet with your average column from Z to A after any changes on the spreadsheet.

> Once you have the spreadsheet, get its ID from its URL, and add it to the ggsheets.py file where it says `SPREADHEET_ID`.
> Replace the commented text `write ID here` with your spreadsheet id.

7. Start the develpment server

    ```shell
    $ flask run
    ```

8. Open web browser and navigate to `http://localhost:5000` to view rhetoritask.

## Deployment
Once you have tested the app, you might want to deploy it so that anyone with the Speaker Rankings link can view the site. This would enable students and teachers have a slightly better understanding of how they're progressing. Follow the steps below:
- Currently working on easiest way to direct one to do this. Reach out to me for a tailored solution.

## Disclaimer

Please be aware that rhetoritask is a temporary solution and is not a fully featured application at this time. While it provides a way to display the speaker rankings and points per round based on real tournament data, it is still incapable of tabulating data and I am actively working on the API integration to enhance features and functionality of rhetoritask and enable tabulation of speech tournament as we do for debates.


### Contact

If you need any help, have any questions or feedback and/or would like to contribute to this project, please contact me at [rhetoritask@jameslimbe.tech]() or [limbejay254@gmail.com]().