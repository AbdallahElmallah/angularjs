app2.directive('listItemDescription', ListItemDescription)
app2.directive('listItem', ListItem);


function ListItem() {
    var ddo = {
        templateUrl: 'listItem.html'
    };

    return ddo;
}


function ListItemDescription() {
    var ddo = {
        template: '{{ item.quantity }} of {{ item.name }}'
    };

    return ddo;
}
