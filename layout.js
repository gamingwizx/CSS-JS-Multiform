const datas = {
  titles: ["Personal Info", "Select your plan", "Pick add-ons", "Finishing up"],

  description: [
    "Please provide your name, email address, and phone number",
    "You have the option for monthly or yearly payments",
    "Add-ons help enhance your gaming experience",
    "Double check everything looks OK before continuing"
  ]
}
class Layout {
  get getDyamicLayouts() {
    return this.dynamicLayouts
  }

  set setDynamicLayouts(dynamicLayouts) {
    this.dynamicLayouts = dynamicLayouts
  }

  get getLayouts() {
    return this.layout
  }

  set setLayouts(layout) {
    this.layout.push(layout)
  }

  get getSummaryPage() {
    return this.summaryPage
  }

  set setSummaryPage(summaryPage) {
    this.summaryPage = summaryPage
  }

  get getTemplates() {
    return this.templates
  }

  set setTemplates(template) {
    this.templates = template
  }

  get getData() {
    return this.data
  }

  set setData(data) {
    this.data[data.name] = data.value
  }

  constructor(dynamicLayouts, layouts, templates) {
    this.dynamicLayouts = dynamicLayouts
    this.layouts = layouts
    this.templates = templates

    // this.summaryPage = summaryPage
    // this.contentHeader = contentHeader
    this.data = {}
  }

  renderHeadigs() {
    const title = this.layouts.contentHeader.querySelector("h1")
    const description = this.layouts.contentHeader.querySelector("p")
    description.innerText = datas.description[this.data.currentStep]
    title.innerText = datas.titles[this.data.currentStep]
  }

  renderLayout(step) {
    this.dynamicLayouts.contents[step].classList.toggle("active")
    this.dynamicLayouts.contents[this.data.currentStep].classList.toggle(
      "active"
    )
    this.dynamicLayouts.items[step].classList.toggle("active")
    this.dynamicLayouts.items[this.data.currentStep].classList.toggle("active")
    this.data.currentStep = step
  }

  renderSummary() {
    this.renderServiceSelected()
    this.renderAddOns()
    this.renderTotal()
  }

  renderServiceSelected() {
    this.layouts.summary.querySelector(
      ".summary__service-name"
    ).innerText = `${this.data.service.name} (${this.data.service.subscriptionDuration})`
    this.layouts.summary.querySelector(
      ".summary__service-price"
    ).innerText = `$${this.data.service.price}/mo`
  }

  renderAddOns() {
    this.layouts["summary"].querySelector(".services").innerText = ""
    this.data.extraServices.forEach((extraService) => {
      const node = this.cloneTemplate(extraService)
      this.layouts["summary"].querySelector(".services").appendChild(node)
    })
  }

  renderTotal() {
    this.layouts.summary.querySelector(
      ".total-price"
    ).innerText = `$${this.data.total}/mo`
  }

  cloneTemplate(extraService) {
    const node = this.templates.addOn.content.cloneNode(true)
    node.querySelector(".extra-service-name").innerText = extraService.name
    node.querySelector(
      ".extra-service-price"
    ).innerText = `+$${extraService.price}/mo`

    return node
  }
}

export default Layout
