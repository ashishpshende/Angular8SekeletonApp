var winWidth;
$(document).ready(function () {
    winWidth = $(window).width();
    if ($('.autonumeric')) $('.autonumeric').autoNumeric('init');
});

$(window).on('load', function () {
    numberInput();
    if ($('.customSelect').length) {
        customSelectInit('.customSelect');
    }
    formControlActive();
    manageSpaces();
    $('.preloader').fadeOut();

}).on('resize', function () {
    winWidth = $(window).width();
    manageSpaces();
}).on('scroll', function () {

});
function datePicker() {
    //alert('Welcome to custom js');
    if ($('.datepicker').length > 0) {
    $(".datepicker").datetimepicker({
        format: 'DD/MM/YYYY',
        //debug: true,
        //viewDate: new Date(),
        daysOfWeekDisabled: [0, 6],
        useCurrent: false,
        icons: {
            time: 'tpaicon-clock',
            date: 'tpaicon-calendar',
            up: 'tpaicon-arrow-up',
            down: 'tpaicon-arrow-down',
            previous: 'tpaicon-arrow-left',
            next: 'tpaicon-arrow-right',
            today: 'tpaicon-refresh',
            clear: 'tpaicon-trash',
            close: 'tpaicon-multiply'
        }
    });
}
if ($('.timepicker').length > 0) {
    var dt = new Date();
    var currentTime = dt.getHours() + ":" + dt.getMinutes();
    $(".timepicker").datetimepicker({
        format: 'h:mm a',
        //debug: true,
        //viewDate: new Date(),
        useCurrent: false,
        icons: {
            time: 'tpaicon-clock',
            date: 'tpaicon-calendar',
            up: 'tpaicon-arrow-up',
            down: 'tpaicon-arrow-down',
            previous: 'tpaicon-arrow-left',
            next: 'tpaicon-arrow-right',
            today: 'tpaicon-refresh',
            clear: 'tpaicon-trash',
            close: 'tpaicon-multiply'
        }
    }).text(currentTime);
}
}

$(function() {
    //alert('Hello, jquery js');    
});

var settings = {
    "responsive": true,
    "ordering": false,
    // "sDom": "<'table-header d-flex justify-content-between'<'actions-left d-flex align-items-center'fl><'actions-right ml-auto d-flex align-items-center'ip>>t",
    "sDom": "<'table-header d-flex justify-content-between'<'actions-left d-flex align-items-center'f<'export-btn-wrapper'B>><'actions-right ml-auto d-flex align-items-center'lip>>t",
    // "sDom": "<'table-header'li<'export-btn-wrapper'B><'table-actions'p>>t",
    "sPaginationType": "full",
    //"bLengthChange": false,
    "destroy": true,
    "serverSide": false,
    "pageLength": 50,
    // "autoWidth": false,
    /* columnDefs: [
        { orderable: false, targets: 0 }
    ], */
    "buttons": {
        "buttons": [
          { extend: 'excel', "text":'excel', titleAttr: 'Export to Excel' },
          { extend: 'pdf', "text":'pdf', titleAttr: 'Export to PDF' },
          { extend: 'print', "text":'print', titleAttr: 'Print' }
          // 'csv', 'excel', 'pdf', 'print'
        ],
        dom: {
          container: {
            // tag: 'select',
            className: 'btn-list bg-white pull-right p-l-10'
          },
          button: {
            tag: 'a',
            className: 'btn'
          }
        }
      },
    rowCallback: function (row, data) {
        var colData = $($.parseHTML(data[1]));
        var mainColData = $($.parseHTML(data[0]));

        // Quote list
        if (colData.find('.status-value').length) {
            var rowStatus = colData.find('.status-value').val();
            if (rowStatus == "order-expired") $(row).addClass('bg-danger-light');
            if (rowStatus == "order-placed") $(row).addClass('bg-success-light');
        }
        if (colData.find('.details-link').length) {
            var rowLink = colData.find('.details-link').val();
            $(row).find('td:not(.arrowContainer)').on('click', function () {
                window.location = rowLink;
            });
        } else if(mainColData.find('.details-link').length) {
            var rowLink = mainColData.find('.details-link').val();
            $(row).find('td:not(.arrowContainer)').on('click', function () {
                window.location = rowLink;
            });
        }

        // Quote details
        if (mainColData.find('.feasibilityLow').length) {
            var rowStatus = mainColData.find('.feasibilityLow').val();
            if (rowStatus != "false") $(row).addClass('bg-warning-light');
        }
        if (mainColData.find('.allow-feedback').length) {
            var rowStatus = mainColData.find('.allow-feedback').val();
            if (rowStatus == "true") $(row).addClass('feedback-link-wrapper');
        }
        if (mainColData.find('.FeasibilityValue').length) {
            var rowLink = mainColData.find('.FeasibilityValue').val();
        }
        if (mainColData.find('.CPIValue').length) {
            var rowLink = mainColData.find('.CPIValue').val();
        }
        if (mainColData.find('.item-key').length) {
            var rowLink = mainColData.find('.item-key').val();
        }
    },
    "language": {
        "sSearch": "",
        "lengthMenu": "_MENU_ ",
        "sInfo": "_PAGE_/_PAGES_",
        "sInfoEmpty": "0/0",
        "sInfoFiltered": "",
        "paginate": {
            "previous": "<span class='tpaicon-arrow-left'></span>",
            "next": "<span class='tpaicon-arrow-right'></span>",
            "first": "<span class='tpaicon-arrow-left'></span><span class='tpaicon-arrow-left'></span>",
            "last": "<span class='tpaicon-arrow-right'></span><span class='tpaicon-arrow-right'></span>"
        }
    },
    "initComplete": function () {
        $(".dataTables_info").prependTo(".table-actions");
        $('.export-btn-wrapper').prepend('<div class="btn-list-title">Export</div>');

        $('.no-header thead').remove();
        $('.btn-list-title').on('click', function(e){
          $('.export-btn-wrapper .btn-list').toggle();
          $('.export-btn-wrapper').toggleClass('active');
           e.stopPropagation();
        });
        $('html').click(function() {
          var $drop = $('.export-btn-wrapper .btn-list');
          if($drop.is(":visible")) {
            $drop.hide();
            $('.export-btn-wrapper').removeClass('active');
          }
        });
        
        if ($('.table-wrapper > .table-status-wrapper').length) {
            $('.table-wrapper > .table-status-wrapper').addClass('d-none');
            $('.table-wrapper > .table-status-wrapper').clone().appendTo('.table-wrapper > div > div > div > .table-header > .actions-left');
            $('.table-header > .actions-left .table-status-wrapper').removeClass('d-none');
            $('.table-wrapper > .table-status-wrapper').remove();
            customSelectInit('.table-header > .actions-left .table-status-wrapper select');
            $('.table-header > .actions-left .table-status-wrapper select').selectpicker('refresh');
        }
        
        //if($.isFunction(window.startIntro)) startIntro();

        formControlActive();
    }
};
function useDataTable($tableName) {
    table = $($tableName).dataTable(settings);
    $(table).on("draw.dt", function(e) {
        //customSelectDropdown('.item-type:not(.select2-hidden-accessible)', "width: '55px'");
        numberInput();
        // addExtraButtons();
    });
}


function manageSpaces() {
    var winHeight = $(window).height();
    var navHeight = $('.header-wrapper').outerHeight();
    var contentHeight = $('.content-wrapper').outerHeight();
    if(winHeight > (navHeight + contentHeight) ) {
        $('.footer-wrapper').addClass('sticky-bottom');
    } else {
        $('.footer-wrapper').removeClass('sticky-bottom');
    }

    $('.sidebar-wrapper').css('top',navHeight);
}

function formControlActive() {    
    if($('.form-control').length) {
        $('.form-control').each(function(){
            ($(this).val() != '') ? $(this).addClass('hasValue') : $(this).removeClass('hasValue');
        });

        $('.form-control').on('blur', function(){
            ($(this).val() != '') ? $(this).addClass('hasValue') : $(this).removeClass('hasValue');
        });
    }
}

function numberInput() {
    $('.form-number').each(function () {
        if (!$(this).hasClass('activated')) {
            $(this).addClass('activated');
            var numberInput = '', count = '', step = '', minNumber = '', maxNumber = '';

            $(this).find('.step-up:not([disabled])').on('click', function (e) {
                numberInput = $(this).next('[type="number"]');
                (numberInput.is("[step]")) ? step = numberInput.attr('step') : step = '1';
                (numberInput.is("[max]")) ? maxNumber = numberInput.attr('max') : maxNumber = '';
                count = numberInput.val();
                count = parseInt(count) + parseInt(step);
                if (maxNumber != '' && maxNumber != '""') {
                    if (count < maxNumber) {
                        numberInput.val(count);
                    } else {
                        $(this).addClass('disabled');
                        $(this).attr('disabled', 'disabled');
                        numberInput.val(maxNumber);
                    }
                } else { numberInput.val(count) }
                $(this).parent().find('.step-down').removeClass('disabled');
                $(this).parent().find('.step-down').removeAttr('disabled');
                maxNumber = '';
            });

            $(this).find('.step-down:not([disabled])').on('click', function (e) {
                numberInput = $(this).prev('[type="number"]');
                (numberInput.is("[step]")) ? step = numberInput.attr('step') : step = '1';
                (numberInput.is("[min]")) ? minNumber = numberInput.attr('min') : minNumber = '';
                count = numberInput.val();
                count = parseInt(count) - parseInt(step);
                if (minNumber != '' && minNumber != '""') {
                    if (count > minNumber) {
                        numberInput.val(count);
                    } else {
                        $(this).addClass('disabled');
                        $(this).attr('disabled', 'disabled');
                        numberInput.val(minNumber);
                    }
                } else { numberInput.val(count) }
                $(this).parent().find('.step-up').removeClass('disabled');
                $(this).parent().find('.step-up').removeAttr('disabled');
                minNumber = '';
            });

            $(this).find('input').on('blur', function () {
                var minInput = parseInt($(this).attr('min'));
                var maxInput = parseInt($(this).attr('max'));
                var inputVal = parseInt($(this).val());
                if (inputVal <= minInput) {
                    $(this).val(minInput);
                    $(this).next().addClass('disabled');
                    $(this).next().attr('disabled', 'disabled');
                    $(this).prev().removeClass('disabled');
                    $(this).prev().removeAttr('disabled');
                } else if (inputVal >= maxInput) {
                    $(this).val(maxInput);
                    $(this).prev().addClass('disabled');
                    $(this).prev().attr('disabled', 'disabled');
                    $(this).next().removeClass('disabled');
                    $(this).next().removeAttr('disabled');
                } else {
                    $(this).val(inputVal);
                    $(this).parent().find('[class*="step-"]').removeClass('disabled');
                    $(this).parent().find('[class*="step-"]').removeAttr('disabled');
                }
            });
        }
    });
}

var singleSelect = {
    style: "btn-select",
    liveSearch: "true"
}
var multiSelect = {
    style: "btn-select",
    liveSearch: "true",
    selectedTextFormat: "count"
}
var multiSelectActions = {
    style: "btn-select",
    liveSearch: "true",
    selectedTextFormat: "count",
    actionsBox: "true",
    selectAllText: "Select All",
    deselectAllText: "Deselect All"
}
var singleSelectNoSearch = {
    style: "btn-select"
}
var multiSelectNoSearch = {
    style: "btn-select",
    selectedTextFormat: "count"
}
var multiSelectActionsNoSearch = {
    style: "btn-select",
    selectedTextFormat: "count",
    actionsBox: "true",
    selectAllText: "Select All",
    deselectAllText: "Deselect All"
}

function customSelectInit(customSelectInput) {
    $(customSelectInput).each(function () {
        selectSettings = $(this).data('settings');
        customSelectItem = '#' + $(this).attr('id');
        customSelect(customSelectItem, selectSettings);
    });
}

function customSelect(selectItem, settings) {
    switch (settings) {
        case "singleSelect":
            $(selectItem).selectpicker(singleSelect);
            break;
        case "multiSelect":
            $(selectItem).selectpicker(multiSelect);
            break;
        case "multiSelectActions":
            $(selectItem).selectpicker(multiSelectActions);
            break;
        case "singleSelectNoSearch":
            $(selectItem).selectpicker(singleSelectNoSearch);
            break;
        case "multiSelectNoSearch":
            $(selectItem).selectpicker(multiSelectNoSearch);
            break;
        case "multiSelectActionsNoSearch":
            $(selectItem).selectpicker(multiSelectActionsNoSearch);
            break;
    }
}

if ($('.datepicker').length > 0) {
    $(".datepicker").datetimepicker({
        format: 'DD/MM/YYYY',
        //debug: true,
        //viewDate: new Date(),
        daysOfWeekDisabled: [0, 6],
        useCurrent: false,
        icons: {
            time: 'tpaicon-clock',
            date: 'tpaicon-calendar',
            up: 'tpaicon-arrow-up',
            down: 'tpaicon-arrow-down',
            previous: 'tpaicon-arrow-left',
            next: 'tpaicon-arrow-right',
            today: 'tpaicon-refresh',
            clear: 'tpaicon-trash',
            close: 'tpaicon-multiply'
        }
    });
}

if ($('.timepicker').length > 0) {
    var dt = new Date();
    var currentTime = dt.getHours() + ":" + dt.getMinutes();
    $(".timepicker").datetimepicker({
        format: 'h:mm a',
        //debug: true,
        //viewDate: new Date(),
        useCurrent: false,
        icons: {
            time: 'tpaicon-clock',
            date: 'tpaicon-calendar',
            up: 'tpaicon-arrow-up',
            down: 'tpaicon-arrow-down',
            previous: 'tpaicon-arrow-left',
            next: 'tpaicon-arrow-right',
            today: 'tpaicon-refresh',
            clear: 'tpaicon-trash',
            close: 'tpaicon-multiply'
        }
    }).text(currentTime);
}