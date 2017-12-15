function raY(){
    WdatePicker({
        dateFmt : 'yyyy',
        readOnly : true
    });
}
function raYM(){
    WdatePicker({
        dateFmt : 'yyyy-MM',
        readOnly : true
    });
}
function raYMD(){
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        isShowWeek : true,
        readOnly : true
    });
}
function raYMDH(){
    WdatePicker({
        dateFmt : 'yyyy-MM-dd HH:mm:ss',
        isShowWeek : true,
        readOnly : true
    });
}
function raH() {
    WdatePicker({
        dateFmt : 'HH:mm:00',
        isShowToday : false,
        isShowOK : false,
        readOnly : true
    });
}
function raYMDSinceNow() {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        minDate : '%y-%M-%d'
    });
}
function raYMDSince(date) {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        minDate : date
    });
}
function raYMDUntilNow() {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        maxDate : '%y-%M-%d'
    });
}
function raYMDUntil(date) {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        maxDate : date
    });
}
function raYMDBetween(startDate,endDate) {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        minDate : startDate,
        maxDate : endDate
    });
}