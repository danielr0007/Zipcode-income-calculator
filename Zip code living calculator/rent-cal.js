// DOM ELEMENTS........
const input = document.querySelector("#zip");
const button = document.querySelector("#button");
const avgYearlyIncomeElement = document.querySelector("#avg-yearly-income");
const avgMonthlyIncomeElement = document.querySelector("#avg-monthly-income");
const avgHourlyIncomeElement = document.querySelector("#avg-hourly-income");
const oneRoomRentElement = document.querySelector("#one-room-avg");
const twoRoomRentElement = document.querySelector("#two-room-avg");
const threeRoomRentElement = document.querySelector("#three-room-avg");
const incomeOneRoomElement = document.querySelector("#one-room-avg-income");
const incomeTwoRoomElement = document.querySelector("#two-room-avg-income");
const incomeThreeRoomElement = document.querySelector("#three-room-avg-income");
const sectionToHide = document.querySelector(".table-section");

// GETS THE INFORMATION FROM THE API AND DISPLAYS THE RESULTS ON THE PAGE........
button.addEventListener("click", function () {
  if (input.value === "") {
    return;
  }

  if (sectionToHide.classList.contains("hide")) {
    sectionToHide.classList.remove("hide");
  }

  let zipEntered = input.value;
  console.log(zipEntered);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "realty-mole-property-api.p.rapidapi.com",
      "X-RapidAPI-Key": "5bb39c43d6mshc203645b9348467p1934d7jsnea38fcf5045f",
    },
  };

  // PROMISE THAT RECEIVES DATA USING FETCH..........
  fetch(
    `https://realty-mole-property-api.p.rapidapi.com/zipCodes/${zipEntered}`,
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      // LOGIC THAT ORGANIZES DATA FROM JSON INTO VARIABLES.........
      console.log(response);
      const avgRentResponse = response.rentalData.averageRent;
      const oneBedRoomRent = response.rentalData.detailed[1].averageRent;
      const twoBedRoomRent = response.rentalData.detailed[2].averageRent;
      const threeBedRoomRent = response.rentalData.detailed[3].averageRent;

      // LOGIC THAT ORGANIZES CALCULATED FINAL DATA INTO VARIABLES
      const yearlyIncomeBasedOnAvgRent = Math.trunc(
        avgRentResponse * 12 * 3.3333
      ).toLocaleString("en-US");
      const monthlyIncomeBasedOnAvgRent = Math.trunc(
        avgRentResponse * 3.3333
      ).toLocaleString("en-US");
      const hourlyIncomeBasedOnAvgRent = Math.trunc(
        (avgRentResponse * 3.3333) / 160
      ).toLocaleString("en-US");

      // income per rooms
      const oneRoomIncomeYear = Math.trunc(
        oneBedRoomRent * 12 * 3.3333
      ).toLocaleString("en-US");
      const twoRoomIncomeYear = Math.trunc(
        twoBedRoomRent * 12 * 3.3333
      ).toLocaleString("en-US");
      const threeRoomIncomeYear = Math.trunc(
        threeBedRoomRent * 12 * 3.3333
      ).toLocaleString("en-US");

      // LOGIC THAT FILLS IN INCOME DATA ON PAGE.........
      avgYearlyIncomeElement.textContent = yearlyIncomeBasedOnAvgRent;
      avgMonthlyIncomeElement.textContent = monthlyIncomeBasedOnAvgRent;
      avgHourlyIncomeElement.textContent = hourlyIncomeBasedOnAvgRent;
      incomeOneRoomElement.textContent =
        oneRoomIncomeYear.toLocaleString("en-US");
      incomeTwoRoomElement.textContent =
        twoRoomIncomeYear.toLocaleString("en-US");
      incomeThreeRoomElement.textContent =
        threeRoomIncomeYear.toLocaleString("en-US");

      // LOGIC THAT FILLS IN RENT DATA IN PAGE
      oneRoomRentElement.textContent = Math.trunc(oneBedRoomRent);
      twoRoomRentElement.textContent = Math.trunc(twoBedRoomRent);
      threeRoomRentElement.textContent = Math.trunc(threeBedRoomRent);
    })
    .catch(function (err) {
      console.error(err);
    });
});

input.addEventListener("click", function () {
  if (input.value !== "") {
    input.value = "";
  }
});
