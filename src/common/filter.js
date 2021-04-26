export default {
    filterType(code) {
        console.log('---------------------', code)
        switch(code) {
            case 10041001:
                code = '全校';
                break;
            case 10041002:
                code = '年级';
                break;
            case 10041003:
                code = '班级';
                break;
        }
        return code;
    }
}