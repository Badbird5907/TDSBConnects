import moment from 'moment';

const dateFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ";
const otherDateFormat = "YYYY-MM-DDTHH:mm:ss";
const smallDateFormat = "DDMMYYYY";

export const formatDate = (input: string) => {
    /*
    if (in.contains("Z")) {
                date = dateFormat.parse(in);
            } else {
                date = otherDateFormat.parse(in);
            }
     */
    if (input.includes("Z")) {
        return moment(input, dateFormat);
    } else {
        return moment(input, otherDateFormat);
    }
}
export const momentToTime = (input: moment.Moment) => {
    const format = "hh:mm A"
    return input.format(format);
}
export const formatSmallDate = (input: Date) => {
    return moment(input).format(smallDateFormat);
}
