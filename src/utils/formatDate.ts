import dayjs from 'dayjs';

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD MMMM, YYYY');
};

export const formatDateAsYear = (dateString: string) =>
  dateString ? dayjs(dateString).format('YYYY') : '';
