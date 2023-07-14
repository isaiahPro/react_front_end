// apiData.js
import supabase from '../supabase';

  async function LaptopList() {
    const { data: itemsData, error: itemsError } = await supabase
      .from('laptops')
      .select('*')
      .order('created_at', { ascending: false });

    if (itemsError) {
      console.error(itemsError);
      return;
    }
    else{
      return itemsData;
    }
  }
async function PhoneList() {
  const { data: itemsData, error: itemsError } = await supabase
  .from('phones')
  .select('*')
  .order('created_at', { ascending: false });
if (itemsError) {
  console.error(itemsError);
  return;
}
else{
  return itemsData;
}
}
async function OtherList() {
  const { data: itemsData, error: itemsError } = await supabase
  .from('others')
  .select('*')
  .order('created_at', { ascending: false })
if (itemsError) {
  console.error(itemsError);
  return;
}
else{
  return itemsData;
}
}

async function LaptopListlimit() {
  const { data: itemsData, error: itemsError } = await supabase
  .from('laptops')
  .select('*')
  .limit(9)
  .order('created_at', { ascending: false })
if (itemsError) {
  console.error(itemsError);
  return;
}
else{
  return itemsData;
}
}
async function PhoneListLimit() {
  const { data: itemsData, error: itemsError } = await supabase
  .from('phones')
  .select('*')
  .limit(9)
  .order('created_at', { ascending: false });
if (itemsError) {
  console.error(itemsError);
  return;
}
else{
  return itemsData;
}
}



async function OtherListLimit() {
  const { data: itemsData, error: itemsError } = await supabase
  .from('others')
  .select('*')
  .limit(9)
  .order('created_at', { ascending: false })
if (itemsError) {
  console.error(itemsError);
  return;
}
else{
  return itemsData;
}
}

export { LaptopList,PhoneList,OtherListLimit,PhoneListLimit,LaptopListlimit,OtherList};