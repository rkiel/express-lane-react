# Bootstrap

### layout - container

    <div class='container'>        // center and pad the sides
    <div class='container-fluid'>  // center and stretch to sides

### layout - grid

    <div class='row'>             // expect a grid within the element
    <div class='col-md-*'>        // column of width x (1..12)
    <div class='col-md-offset-*'> // left offset by a number of columns (0..11)

    <div class='hidden-sm'>       // hide the element on sm
    <div class='visible-md'>      // show the element on md

### typography

    <p class='lead'>                              // increase font size and weight and padding
    <div class='row text-center'>                 // alignment: justify,left,center,right,nowrap
    <i class='glyphicon glyphicon-briefcase'></i> // specify font family and icon
    <ul class='list-unstyled'>                    // list: list-inline
    <div class='row well well-lg'>                // inset well-lg or well-sm

### buttons

    <button type='button' class='btn btn-lg'>      // btn-lg, btn-sm, btn-xs
    <button type='button' class='btn btn-default'> // types: default,primary,success,info,danger,warning

### navigation

    <a href='/' class='navbar-brand') // positioned to the left
    <ul class='nav nav-pills'>        // nav-pills,nav-tabs,navbar-nav

### layout - 12 columns per row

*  1 - 12 columns col-md-12
*  2 -  6 columns col-md-6
*  3 -  4 columns col-md-4
*  4 -  3 columns col-md-3
*  6 -  2 columns col-md-2
* 12 -  1 columns col-md-1

### layout - common ratios
*  9 columns (content) + 3 columns (sidebar)
*  8 columns (content) + 1 column (offset) + 3 columns (sidebar)

### Example

* sm - 1 row: 3 columns
* xs - 2 rows: 1 column and 2 columns

###

    <div class='container'>
      <div class='row'>
        <div class='col-sm-4 col-sm-offset-0 col-xs-10 col-xs-offset-1'></div>
        <div class='col-sm-4                 col-xs-6                 '></div>
        <div class='col-sm-4                 col-xs-6                 '></div>
      </div>
    </div>

### Sizes

    Phone    Extra Small  .col-xs      0px+
    Tablet   Small        .col-sm    768px+
    Laptop   Medium       .col-md    992px+
    Monitor  Large        .col-lg   1200px+

### Custom CSS

    // only style glyphicon inside a class of features
    .features .glyphicon {
      font-size: 32px;
      color:     red;
    }
