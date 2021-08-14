import React from 'react'
// import { useParams, Link } from 'react-router-dom';
// import { useMutation, useQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
// import { CREATE_FARMS } from '../utils/mutations'
import {QUERY_FARMS} from '../utils/queries'
import { getZips } from '../utils/getZips';

export default function TestPage() {
    // let { id } = useParams();
    let test = [];
    async function testRun() {
        test = await getZips(`03301`)
        console.log(test)
    }

    testRun();
    // let zipcode = getZips(`03301`);
    console.log(test);

    const { loading, error, data } = useQuery(QUERY_FARMS, {
        variables: { zip: ["03046", "03304", "03275", "03229", "03302", "03305", "03301", "03258", "03303", "03307", "03224"] },
    });
    

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const farms = data?.farmsByZip || [];
    // console.log(data)
    // console.log(farms);


  

    // const [createFarm, { error }] = useMutation(CREATE_FARMS);

    // const handleFarmCreation = async (addFarm) => {
    //     try {
    //       await createFarm({
    //         variables: { zip: zipcode, addFarm: addFarm },
    //       });
    //     } catch (err) {
    //       console.error(err);
    //     }
    // };

    return (
        <div>
            <p>
            hello! {farms[0].name}
            </p>
            
        </div>
    )
}
