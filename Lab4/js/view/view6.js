var View6 = function (container, model) {
    model.addObserver(this);

    var miniheader = $("<div>").addClass("row").addClass("miniheader");
    var mhtitle = $("<h3>").text("My Dinner: " + model.getNumberOfGuests() + " people");
    miniheader.append($("<div>").addClass("col-md-8").append(mhtitle));
    container.append(miniheader);
    var button = $("<button>").attr("id", "final-back-btn").text("Go back and edit dinner");
    miniheader.append($("<div>").addClass("col-md-4").append(button));

    var storage = $("<div>").addClass("container");

    function insertDishes() {
        var menu = model.getFullMenu();
        menu.forEach(function (d) {
            var foodRow = $("<div>").addClass("row").addClass("foodRow");
            var div1 = $("<div>").addClass("col-md-2");
            div1.append($("<img>").attr("src", "images/" + d.image));
            foodRow.append(div1);
            storage.append(foodRow);

            var div2 = $("<div>").addClass("col-md-4");
            var foodTitle = $("<h4>").text(d.name.toUpperCase());
            var paragraph = $("<p>").text(d.description);
            div2.append(foodTitle);
            div2.append(paragraph);
            foodRow.append(div2);

            var div3 = $("<div>").addClass("col-md-6");
            div3.append($("<h5>").text("PREPARATION"));
            div3.append($("<p>").text(d.description));
            foodRow.append(div3);

        });
    }

    insertDishes();
    container.append(storage);

    this.update = function (obj) {
        switch (obj) {
            case Events.MENU_CHANGED:
                storage.empty();
                insertDishes();
                break;
            case Events.GUESTS_CHANGED:
                mhtitle.text("My Dinner: " + model.getNumberOfGuests() + " people");
                break;
        }
    }
};