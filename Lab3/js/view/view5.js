var View5 = function(container, model){
	model.addObserver(this);

	var miniheader = $("<div>").addClass("row").addClass("miniheader");
	var mhtitle = $("<h3>").text("My Dinner: " + model.getNumberOfGuests() + " people");
	miniheader.append($("<div>").addClass("col-md-8").append(mhtitle));
	container.append(miniheader);
	var button = $("<button>").attr("id", "edit-btn").text("Go back and edit dinner");
	miniheader.append($("<div>").addClass("col-md-4").append(button));

	var selectedMenu = $("<div>").attr("id", "selectedMenu");
	function insert_dishes() {
        var menu = model.getFullMenu();
        menu.forEach(function (d) {
            var imgBox = $("<div>").addClass("imgBox");
            var tempDiv = $("<div>");
            var img = $("<img>").attr("src", "images/" + d.image);
            tempDiv.append(img);
            tempDiv.append($("<div>").append($("<h4>").text(d.name)));
            imgBox.append(tempDiv);

            var price = $("<div>").addClass("price").text(model.getDishPrice(d.id) * model.getNumberOfGuests() + " SEK");
            imgBox.append(price);
            console.log(price);
            selectedMenu.append(imgBox);

        });

        var menuResult = $("<div>").addClass("menuResult");
        menuResult.append($("<p>").text("Total:"));
        menuResult.append($("<div>").addClass("price").text(model.getTotalMenuPrice() + " SEK"));

        selectedMenu.append(menuResult);
        container.append(selectedMenu);

    }
    insert_dishes();
    container.append($("<div>").addClass("separator"));
    container.append($("<span>").attr("id", "printButton").append($("<button>").attr("type", "button").text("Print Full Recipe")));

	this.update = function(obj) {
		switch(obj) {
            case Events.MENU_CHANGED:
            	selectedMenu.empty();
                mhtitle.html("My Dinner: " + model.getNumberOfGuests() + " people");
            	insert_dishes();
        }
	}
};