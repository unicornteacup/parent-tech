$(() => {
  $.ajax({
    method: "GET",
    url: "/api/companies"
  }).done((companies) => {
    for(company of companies) {
      $("<div>").text(company.name).appendTo($("body"));
    }
  });;
});
