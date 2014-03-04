/**
 * @author
 */

	/*  OUTLINE: 
	1. Get data from FRED
	2. Create Google fusion table with data from FRED (or other data source)
	3. Pull data back from fusion table using SQL (querying for data) - add fusion table ID (and personal Google Fusion API key) to URL
	4. Use new URL as data source (no longer using static JSON file)
	5. Update code to draw chart 
	6. Change range of data used by chart by updating the URL using SQL 
	
	*/
	console.log("hello there"); 
	
	//CivUnempRate is the local name of the json file that will be loaded
	
	function mDataLoaded(CivUnempRate){
		
		console.log(CivUnempRate)
		
		//The below variable feeds the data to visualization library
		var gUnempTable = new google.visualization.DataTable();
		
		//when I add columns (column names) the first parameter is the data type in that column
		//the 2nd paramenter is the name of the column
		
		gUnempTable.addColumn('string', CivUnempRate.columns[0]);  //only works because this is a google.visualization
		gUnempTable.addColumn('number', CivUnempRate.columns[1]);
		
		gUnempTable.addRows(CivUnempRate.rows) //only works because this is a google.visualization
		
		
		//With Google Visualizations we have the option to customize our charts
		//Below, I used the gChartOptions variable to create an object to add a title to the chart
		// I also used the gChartOptions variable to create objects to adjust the size of the chart, and its position from the left border
		 
		 var gChartOptions = {
         title: "Civil Unemployment Rate since 1990",     
    	 width: 1500,
       	 height: 500,
       	 chartArea: {
       	 	left: 100
      	 }
        
        };

	
		//Below we tell the computer to create a line chart
		//We use a function that is part of the Google Visualizations library 
		
		var gUnempChart = new google.visualization.LineChart(document.getElementById("myChartDiv"));
  			gUnempChart.draw(gUnempTable, gChartOptions);
   	
	}
	
		//Below I have created and named the function gloaded

	function gLoaded(){
		
		console.log("google loaded");
		
		// instead of loading data from a static JSON file I'm going to laod it from a google fusion table
		// we do this by using the URL with our fusion table ID
		// I have also changed the range of data that is charted by refining the query in the URL 
		// I did this by adding the following instructions in SQL WHERE+DATE>'1989-12-01'
		
		$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+12A0eKUXKb4TCFhngfaGqaMEH6uECY1iBhd3VOBAV+WHERE+DATE>'1989-12-01'&key=AIzaSyDsBrSpJRliKgi913vr9FWTy8oL57c42bA", mDataLoaded, "json");
		
		
		// in order to have two charts on the same page we would need a second get request. 
		// we would also need a new dataloaded function - or a different function (e.g. dataloaded2)
		//can still use same argument name becuase we are in a completely different function
		//we would also need a new div
	}
		
		//Below I have created and named the function mPageLoaded
		
	function mPageLoaded(){
		
		console.log("got to page Loaded");
		
		//load the google visualization library 
		//added the callback - want the name of the callback function to be gLoaded
		
		google.load("visualization", "1", {packages:["corechart"], callback: "gLoaded"});

		
	}
		//The below is a jQuery function that makes sure that the document is ready before loading the data on the page
		//The name of the call-back is BennysPageLoaded
	$(document).ready(mPageLoaded);
