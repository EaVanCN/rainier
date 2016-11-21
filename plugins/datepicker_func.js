function myY(){
    WdatePicker({
        dateFmt : 'yyyy',
        readOnly : true
    });
}
function myYM(){
    WdatePicker({
        dateFmt : 'yyyy-MM',
        readOnly : true
    });
}
function myYMD(){
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        isShowWeek : true,
        readOnly : true
    });
}
function myYMDH(){
    WdatePicker({
        dateFmt : 'yyyy-MM-dd HH:mm:ss',
        isShowWeek : true,
        readOnly : true
    });
}
function myH() {
    WdatePicker({
        dateFmt : 'HH:mm:00',
        isShowToday : false,
        isShowOK : false,
        readOnly : true
    });
}
function myYMDSinceNow() {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        minDate : '%y-%M-%d'
    });
}
function myYMDSince(date) {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        minDate : date
    });
}
function myYMDUntilNow() {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        maxDate : '%y-%M-%d'
    });
}
function myYMDUntil(date) {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        maxDate : date
    });
}
function myYMDBetween(startDate,endDate) {
    WdatePicker({
        dateFmt : 'yyyy-MM-dd',
        readOnly : true,
        isShowWeek : true,
        minDate : startDate,
        maxDate : endDate
    });
}