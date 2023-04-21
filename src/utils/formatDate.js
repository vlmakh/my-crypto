import { format } from 'date-fns';

export const formatDate = date => {
  if (date) {
    return format(Date.parse(date), 'MMM dd, yyyy');
  }
};
