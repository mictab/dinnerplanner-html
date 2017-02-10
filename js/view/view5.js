var View5 = function(container, model){
	var miniheader = $("<div>").addClass("row").addClass("miniheader");
	var mhtitle = $("<h3>").text("My Dinner: " + model.getNumberOfGuests() + " people");
	miniheader.append($("<div>").addClass("col-md-8").append(mhtitle));
	container.append(miniheader);
	var button = $("<button>").text("Go back and edit dinner");
	miniheader.append($("<div>").addClass("col-md-4").append(button));

	var selectedMenu = $("<div>").attr("id", "selectedMenu");
	var menu = model.getFullMenu();
	menu.forEach(function(d){
		var imgBox = $("<div>").addClass("imgBox");
		var tempDiv = $("<div>");
		var img = $("<img>").attr("src", "images/" + d.image);
		tempDiv.append(img);
		tempDiv.append($("<div>").append($("<h4>").text(d.name)));
		imgBox.append(tempDiv);
		
		var price = $("<div>").addClass("price").text("10 SEK");
		imgBox.append(price);
		console.log(price);
		selectedMenu.append(imgBox);
	})
	var menuResult = $("<div>").addClass("menuResult");
	menuResult.append($("<p>").text("Total:"));
	menuResult.append($("<div>").addClass("price").text("20 SEK"));

	selectedMenu.append(menuResult)
	container.append(selectedMenu);

	container.append($("<div>").addClass("separator"));

	container.append($("<span>").attr("id", "printButton").append($("<button>").attr("type", "button").text("Print Full Recipe")));
}