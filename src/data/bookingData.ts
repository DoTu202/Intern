export interface Seat {
  id: string;
  row: string;
  number: string;
  type: "normal" | "vip" | "couple";
  price: number;
  isBooked: boolean;
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 11; 
  const cols = 18;

    //normal ticket
  for (let i = 0; i < rows; i++) {
    const rowLabel = String.fromCharCode(65 + i);
    for (let j = 1; j <= cols; j++) {
      let type: "normal" | "vip" = "normal";
      let price = 55000;


      //vip
      const isRowVip = i >= 4 && i <= 9;
      const isComVip  = j >= 3 && j <= 16;

      if(isRowVip && isComVip) {
        type = "vip";
        price = 65000;
      }

      seats.push({
        id: `${rowLabel}${j}`,
        row: rowLabel,
        number: `${j}`,
        type: type,
        price: price,
        isBooked: false, 
      });
    }
  }

  //couple ticket
  for (let k = 8; k >= 1; k--) {
    const num1 = k * 2 - 1;
    const num2 = k * 2  ;

    seats.push({
      id: `L${num1}${num2}`,
      row: "L",
      number: `L${num1}, L${num2}`,
      type: "couple",
      price: 140000,
      isBooked: false,
    });
  }

  return seats;
};


export const ALL_SEATS = generateSeats();
