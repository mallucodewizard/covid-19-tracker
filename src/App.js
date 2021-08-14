import './App.css';
import { FormControl, MenuItem ,Select} from '@material-ui/core'; 
import React ,{useState,useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
// 
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
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
        setCountries(countries)
        
      });
    };
    getCountriesData(); /**async should be called after defined */
  }, [])

  const onCountryChange = async(event) => {
    const  countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  }
  return (
    <div className="app"> 
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
        <InfoBox title="Coronavirus Cases" cases="12" total="222"/>
        <InfoBox title="Recovered" cases="12" total="222"/>
        <InfoBox title="Deaths" cases="12" total="222"/>

      </div>
      <Map/>
    </div>
  );
}

export default App;
