class Services {
  set service(serviceObject) {
    this.s = serviceObject
  }

  get service() {
    return this.s
  }

  set extraServices(extraServiceObjectList) {
    this.es = extraServiceObjectList
  }

  get extraServices() {
    return this.es
  }

  set subscriptionDuration(extraServiceObjectList) {
    this.duration = extraServiceObjectList
  }

  get subscriptionDuration() {
    return this.duration
  }

  constructor() {
    this.s = { name: "", price: 0 }
    this.es = []
    this.duration = "Monthly"
  }

  total() {
    let total = 0
    this.es.forEach((extraService) => {
      total += parseInt(extraService.price)
    })
    total += parseInt(this.s.price)
    return total
  }
}

export default Services
