import { faker } from '@faker-js/faker/locale/ko';

const companyData = 
  {
    img : "images/img_default.png",
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 1, max: 300 })*10000,
    like: faker.number.int({ min: 0, max: 999 }),
    tags: ["tag1", "tag2"]
  }

const companyDataList = (maxCount) => {
  const result = []
  for(let i = 0; i < maxCount; i++) {
    result.push(companyData)
  }
  return result
}


  export default companyDataList;