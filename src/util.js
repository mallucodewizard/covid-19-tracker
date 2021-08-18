export const sortData = (data) => {
    const sortedData = [...data];

    // sortedData.sort((a,b) => {
    //     if  (a.cases > b.cases){
    //         return -1;
    //     }
    //     else{
    //         return 1;
    //     }
    // });
    // return sortedData;
    // or
    
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1 ));
    

};

// export const showDatanMap = (data,casesType='cases')=> (
//     data.map(country => ())
// )