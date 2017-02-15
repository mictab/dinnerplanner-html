/**
 * Created by michel on 2/15/17.
 */

var SearchDisplayController = function (view, model) {
    var searchInput = $("#input_field");
    var searchBtn = $("#search-button");
    var searchVal = "";

    $("#dish-select").on('change', function () {
       var selectedOption = $(this).find("option:selected");
       if (selectedOption.val() != model.getDishType()) {
           var newVal = selectedOption.val();
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

    $(".dish img").on("click", function(){
        $("#view3").css("display", "none");
        console.log($(this).parent().attr("dish_id"));
        model.setSelectedDishId($(this).parent().attr("dish_id"));
        $("#view4").css("display", "block");
    })
};