import { computed } from "@vue/reactivity"
import moment  from "moment"
import { useI18n } from 'vue-i18n'

export const HummanTime = (ehh) =>{
    // return ehh
    return moment(ehh).toNow(true)
}

export const formatDate = (date) => {
    let formattedDate;
    if(date) {
      formattedDate = moment(moment(date, "DD/MM/YYYY").toDate()).format("DD/MMM/YYYY")
    } 
    
    if(formattedDate){
      return formattedDate
    } else {
      return ""
    }
}

export const formatDateTime = (date) => {
  // var dateString = '2020-09-28T10:23:42.000000Z';
  var dateObj = new Date(date);
  var momentObj = moment(dateObj);
  var momentString = momentObj.format('YYYY-MM-DD HH:mm:ss');
  return momentString;
}

export const formatDateMonth = (date) => {
  // var dateString = '2020-09-28T10:23:42.000000Z';
  var dateObj = new Date(date);
  var momentObj = moment(dateObj);
  var momentString = momentObj.format('YYYY-MMM-DD HH:mm:ss');
  return momentString;
}

export const pushNoDuplicate = (targetArray, itemToPush) => {
  if (!targetArray.find(({value}) => value === itemToPush.value)) {
    targetArray.push(itemToPush);
  }
}

export const translate=(text)=>{
  const {t, te} = useI18n()
  if(te(text)){
    return t(text);
  }
  else{
    return text;
  }
}
