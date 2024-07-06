const datas = {
  titles: ["Personal Info", "Select your plan", "Pick add-ons", "Finishing up"],

  description: [
    "Please provide your name, email address, and phone number",
    "You have the option for monthly or yearly payments",
    "Add-ons help enhance your gaming experience",
    "Double check everything looks OK before continuing"
  ]
}
class pageNavigator {
  set setCurrentStep(step) {
    this.currentStep = step
  }

  get getCurrentStep() {
    this.currentStep = this.currentStep
  }

  constructor(currentStep, previousStep) {
    this.currentStep = currentStep
  }

  next() {
    if (this.currentStep >= datas.titles.length - 1) {
      this.currentStep = datas.titles.length - 1
      return
    }
    this.currentStep = this.currentStep + 1
  }

  previous() {
    this.currentStep = this.currentStep - 1
  }
}

export default pageNavigator
