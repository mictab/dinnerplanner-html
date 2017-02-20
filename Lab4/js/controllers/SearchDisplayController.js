/**
 * Created by michel on 2/15/17.
 */

let SearchDisplayController = function (view, model) {
    let searchInput = $("#input_field");
    let searchBtn = $("#search-button");
    let searchVal = "";

    $("#dish-select").on('change', function () {
        let selectedOption = $(this).find("option:selected");
        if (selectedOption.val() != model.getDishType()) {
            let newVal = selectedOption.val();
            model.setDishType(newVal);
        }
    });

    searchInput.on('change', function () {
        searchVal = searchInput.val();
    });

    searchBtn.on('click', function () {
        if (model.getSearchQuery() != searchVal) {
            model.setSearchQuery(searchVal);
        }
    });

    $("#list-div").on("click", 'img', function () {
        $("#view3").css("display", "none");
        $("#loadingBar").show();
        $("#loadingBar div").show();
        $("#loadingBar span").text("Loading...");
        model.setSelectedDishId($(this).parent().attr("dish_id"), (res) => {
            "use strict";
            if (res === "success") {
                $("#loadingBar").hide();
                $("#view4").css("display", "block");
            } else {
                $("#loadingBar span").text("Failed!");
                $("#loadingBar div").hide();

            }
        });
    })
};