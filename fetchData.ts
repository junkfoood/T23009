// fetchData.ts
import { supabase } from './supabase'

async function fetchTableData() {
  const { data, error } = await supabase
    .from('rates')      // replace with your actual table name
    .select('*')           // or specify columns: 'id, name, percent'

  if (error) {
    console.error('Fetch error:', error.message)
    return
  }

  console.log('Fetched data:', data)
}

fetchTableData()