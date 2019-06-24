import faker from 'faker'

class Country{
    constructor(name, communities){
        this.name = name;
        this.communities = communities;
    }
}

class Community{
    constructor(name, children) {
        this.name = name;
        this.children = children;
    }
}

class Child{
    constructor(name, parentNames, parentContact, DOB, gender, screenings){
        this.name=name;
        this.parentNames = parentNames;
        this.parentContact=parentContact;
        this.DOB=DOB;
        this.gender=gender;
        this.screenings=screenings;
    }
}

class Screening{
    constructor(date, locationCountry, locationCommunity, height, weight){
        this.date=date;
        this.locationCountry=locationCountry;
        this.locationCommunity=locationCommunity;
        this.height=height;
        this.weight=weight;
    }
}

function generateData() {
    let countries=new Array(20);
    for(let i=0; i<countries.length; i++){
        let country = faker.address.country();
        let communities = getCommunities(country)
        countries[i] = new Country(
            `${country}`,
            communities
        )
    }
    return countries;
}

function getCommunities(country) {
    let communities = new Array(Math.floor(Math.random()*6+1));
    for (let i=0; i<communities.length; i++){
        let community = faker.address.county();
        let children = getChildren(community, country);
        communities[i] = new Community(
            `${community}`,
            children
        )
    }
    return communities;
}

function getChildren(community, country) {
    let children = new Array(Math.floor(Math.random()*10+1))
    for( let i=0; i<children.length; i++){
        let gender = getGender();
        let screenings = getScreenings(community, country);
        children[i] = new Child(
            `${faker.name.firstName(gender)} ${faker.name.lastName()}`,
            getParentNames(),
            getParentContact(),
            faker.date.past(18, '2016-12-31'),
            gender,
            screenings
        )
    }
    return children;
}

function getScreenings(community, country) {
    let screenings = new Array(Math.floor(Math.random()*3+1))
    for(let i=0; i<screenings.length; i++){
        screenings[i] = new Screening(
            faker.date.between('2017-01-01', '2019-06-30'),
            country,
            community,
            Math.floor(Math.random()*(120) + 60),
            Math.floor(Math.random()*(80) + 10),
        )
    }
    return screenings;
}

function getGender(){
    if(Math.random()>0.5)
        return 'Male'
    return 'Female'
}

function getParentNames() {
    let lastName = faker.name.lastName();
    let parents = new Array(1)
    if(Math.random()>0.5)
        parents = new Array(2)
    let mom = true;
    let gender = 'Male'
    for(let i=0; i<parents.length; i++){
        if(mom)
            gender='Female'
        parents[i] = `${faker.name.firstName(gender)} ${lastName}`
        mom = !mom;
    }
    return parents;
}

function getParentContact() {
    let parentInfo = {
        address: faker.fake("{{address.streetAddress(useFullAddress)}}, {{address.state}}, {{address.zipCode}}"),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email()
    }
    return parentInfo;
}

let fakeData = generateData();
export  {fakeData};