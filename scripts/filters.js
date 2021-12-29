
app.filter("enter", CustomFilter);

function CustomFilter() {
    return function (input) {
        input = input || "";
        input = input.replace("enter", "aaaa");
        return input;
    };
}
