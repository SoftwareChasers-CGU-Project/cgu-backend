
class vacancies{
  constructor(vacancyId,companyName,companyEmail,vacancyTitle, vacancyDesc , closingDate, poster, vacancyStatus) {
      this.vacancyId = vacancyId;
      this.companyName = companyName;
      this.companyEmail = companyEmail;
      this.vacancyTitle = vacancyTitle;
      this.vacancyDesc = vacancyDesc;
      this.closingDate = closingDate;
      this.poster = poster;
      this.vacancyStatus = vacancyStatus;
  }
}

module.exports = VacancyModel;
