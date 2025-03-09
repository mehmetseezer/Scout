import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { tr } from "date-fns/locale"; 

const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return formatDistanceToNow(date, { addSuffix: true, locale: tr });
    }
    if (isYesterday(date)) {
        return "Dün";
    }
    return format(date, "d MMMM yyyy", { locale: tr });
};

export default formatDate;