let View5 = function (container, model) {
    model.addObserver(this);

    let miniheader = $("<div>").addClass("row").addClass("miniheader");
    let mhtitle = $("<h3>").text("My Dinner: " + model.getNumberOfGuests() + " people");
    miniheader.append($("<div>").addClass("col-md-8").append(mhtitle));
    container.append(miniheader);
    let button = $("<button>").attr("id", "edit-btn").text("Go back and edit dinner");
    miniheader.append($("<div>").addClass("col-md-4").append(button));

    let selectedMenu = $("<div>").attr("id", "selectedMenu");

    function insert_dishes() {
        let menu = model.getFullMenu();
        menu.forEach(function (d) {
            let imgBox = $("<div>").addClass("imgBox");
            let tempDiv = $("<div>");
            let img = $("<img>").attr("src", d.image).attr("width", 140).attr("height", 140);
            tempDiv.append(img);
            tempDiv.append($("<div>").append($("<h4>").text(d.name)));
            imgBox.append(tempDiv);

            let price = $("<div>").addClass("price").text(model.getDishPrice(d.id) * model.getNumberOfGuests() + " SEK");
            imgBox.append(price);
            selectedMenu.append(imgBox);

        });

        let menuResult = $("<div>").addClass("menuResult");
        menuResult.append($("<p>").text("Total:"));
        menuResult.append($("<div>").addClass("price").text(model.getTotalMenuPrice() + " SEK"));

        selectedMenu.append(menuResult);
        container.append(selectedMenu);

    }

    insert_dishes();
    container.append($("<div>").addClass("separator"));
    container.append($("<span>").attr("id", "printButton").append($("<button>").attr("type", "button").text("Print Full Recipe")));

    this.update = function (obj) {
        switch (obj) {
            case Events.GUESTS_CHANGED:
            case Events.MENU_CHANGED:
                selectedMenu.empty();
                insert_dishes();
                mhtitle.html("My Dinner: " + model.getNumberOfGuests() + " people");
                break;
        }
    }
};