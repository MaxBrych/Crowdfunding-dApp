interface props {
  deadline: number;
  goal: number;
  raisedAmount: number;
  url: string;
  callback: (exists: boolean) => void;
}

export const daysLeft = (deadline: any) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = ({ goal, raisedAmount }: props) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (
  url: string,
  callback: (exists: boolean) => void
) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};