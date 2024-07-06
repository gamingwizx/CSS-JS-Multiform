import pageNavigator from "./pageNavigator.js"
import Services from "./service.js"
import Layout from "./layout.js"

const contentHeader = document.querySelector(".content-container__header")
const contentHeaderTitle = contentHeader.querySelector("h1")
const contentHeaderDescription = contentHeader.querySelector("p")
const contents = Array.from(document.querySelectorAll(".content"))
const servicesElement = document.querySelector(".services")
const nextStep = document.querySelector(".next-step")
const total = document.querySelector("[data-total]")
const back = document.querySelector(".back")
const stepList = Array.from(document.querySelectorAll(".step-button"))
const plans = Array.from(document.querySelectorAll(".plan"))
const addOns = Array.from(document.querySelectorAll(".add-on"))
const toggle = document.querySelector(".toggle")
const change = document.querySelector(".change")
const summary = document.querySelector(".summary")
const items = Array.from(document.querySelectorAll(".item"))

const addOnTemplate = document.querySelector("[add-on-template]")

const currentStep = 0
const navigator = new pageNavigator(currentStep)

const dynamicLayouts = {}
dynamicLayouts.contents = contents
dynamicLayouts.items = items

const layouts = {}
layouts.summary = summary
layouts.contentHeader = contentHeader

const templates = {}
templates.addOn = addOnTemplate

const layout = new Layout(dynamicLayouts, layouts, templates)
const services = new Services()

layout.setData = { name: "currentStep", value: navigator.currentStep }
layout.renderHeadigs(navigator.currentStep)
layout.renderLayout(navigator.currentStep)

nextStep.addEventListener("click", (e) => {
  navigator.next()
  showBack(e)
  layout.renderLayout(navigator.currentStep)
  layout.renderHeadigs(navigator.currentStep)
  if (navigator.currentStep === 1) {
    services.service = {
      name: getSelectedPlans()[0],
      price: getSelectedPlans()[1],
      subscriptionDuration: getSelectedSubscriptionDuration()
    }
  }
  if (navigator.currentStep === 3) {
    const data = {}
    layout.setData = { name: "extraServices", value: services.extraServices }
    layout.setData = { name: "service", value: services.service }
    layout.setData = { name: "total", value: services.total() }
    layout.renderSummary()
  }
})
back.addEventListener("click", (e) => {
  navigator.previous()
  layout.renderLayout(navigator.currentStep)
  layout.renderHeadigs(navigator.currentStep)
  if (navigator.currentStep === 0) {
    hideBack(e)
  }
})

toggle.addEventListener("click", (e) => {
  services.service.subscriptionDuration = getSelectedSubscriptionDuration()
})
change.addEventListener("click", (e) => {
  e.preventDefault()
  navigator.setCurrentStep = 1
  layout.renderLayout(navigator.currentStep)
})
plans.forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleAllElementsOff()
    element.classList.add("selected")

    services.service = {
      name: getSelectedPlans()[0],
      price: getSelectedPlans()[1],
      subscriptionDuration: getSelectedSubscriptionDuration()
    }
  })
})

let extraServices = []

addOns.forEach((element) =>
  element
    .querySelector("input[type=checkbox]")
    .addEventListener("input", (e) => {
      const [selectedAddOnName, selectedAddOnPrice] = getSelectedAddons(element)
      const isAddOnAddedBefore = extraServices.find(
        (extraService) => extraService.name === selectedAddOnName
      )
      if (!isAddOnAddedBefore) {
        extraServices.push({
          name: selectedAddOnName,
          price: selectedAddOnPrice
        })
      } else {
        extraServices = extraServices.filter(
          (extraService) => extraService.name !== selectedAddOnName
        )
      }
      services.extraServices = extraServices
    })
)

function getSelectedAddons(element) {
  const checkbox = element.querySelector("input[type=checkbox]")
  const extraServiceName = element.querySelector("[data-extra-service-name]")
    .dataset.extraServiceName
  const extraPriceName = element.querySelector("[data-extra-service-price]")
    .dataset.extraServicePrice
  const isChecked = checkbox.checked
  return [extraServiceName, extraPriceName]
}

function toggleAllElementsOff() {
  plans.forEach((element) => element.classList.remove("selected"))
}

function showBack(e) {
  e.target.parentNode.style.justifyContent = "space-between"
  back.classList.add("show")
}
function hideBack(e) {
  e.target.parentNode.style.justifyContent = "flex-end"
  back.classList.remove("show")
}
function getSelectedSubscriptionDuration() {
  const isChecked = toggle.querySelector("input[type=checkbox]").checked
  if (isChecked) {
    return "Yearly"
  } else {
    return "Monthly"
  }
}
function getSelectedPlans() {
  const selectedPlan = document
    .querySelector(".plans")
    .querySelector(".selected")
  const planTitle =
    selectedPlan.querySelector(".plan__title").dataset.serviceName
  const planPrice =
    selectedPlan.querySelector(".plan__price").dataset.servicePrice

  return [planTitle, planPrice]
}
function renderAddOns() {
  servicesElement.innerText = ""
  services.extraServices.forEach((extraService) => {
    const node = cloneAddOn(extraService)

    servicesElement.appendChild(node)
  })
}
