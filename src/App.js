import './App.css';
import { FormControl, MenuItem ,Select,Card, CardContent} from '@material-ui/core'; 
import React ,{useState,useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util'
import LineGraph from './LineGraph';

//https://disease.sh/v3/covid-19/all 
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const[countryInfo,setCountryInfo] = useState({})
  const[tableData,setTableData] = useState([])
  useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  })
  }, [])
  useEffect(() => {
    // aync is used cause we need to hit and api and wait for the response
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country)=>(
          // restructuring the apis
          {
            name:country.country,
            value: country.countryInfo.iso2
          }
        ));
        setCountries(countries);
        const sortedData = sortData(data);
        setTableData(sortedData);
        
      });
    };
    getCountriesData(); /**async should be called after defined */
  }, [])

  const onCountryChange = async(event) => {
    const  countryCode = event.target.value;
    // console.log(countryCode);
    
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      console.log(countryInfo)
    })
  }
  return (
    <div className="app"> 
    <div className="app__left">
    <div className="app__header">
      {/* Bem naming convention  */}
      <h1>COVID-19 TRACKER </h1>
    <FormControl className="app__dropdown">
      <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="worldwide">WorldWide</MenuItem>
        {
        countries.map((country) => (<MenuItem value={country.value}>{country.name}</MenuItem>

        ))}
        

      </Select>
    </FormControl>  
    </div>
  
      <div className="app__stats" >
        
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered} />
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths}  total={countryInfo.deaths} />

      </div>
      <Map/>
    </div>
   <Card className="app__right">
   <CardContent>
     <h3>Live Cases by Country</h3>
     <Table countries={tableData}/>
     <h3>WorldWide new cases</h3>
     <LineGraph/>
   </CardContent>
   </Card>
 
    </div>
  );
}

export default App;
