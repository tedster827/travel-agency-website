'use client'
import React from "react";
import Header from "src/app/components/Header/Header.client";
import DestinationList from "src/app/components/DestinationList";
import Alert from "src/app/components/Alert/Alert";
import SearchBarWithFilter from "src/app/components/Generic/SearchBarWithFilter";

const HomePage: React.FunctionComponent = () =>  {

    // TODO: Fetch destinations from a graphQL API
    const destinations: string[] = [
        'Manila, Philippines',
        'Berlin, Germany',
        'Tokyo',
        'London',
        'Paris'
    ]

    const localDestinations: string[] = [
        'Griffin Park, Los Angeles',
        'Torrey Pines, San Diego'
    ]

    const alertMessages: React.JSX.Element[] = [
        <p key={"alert_msg_0"}><span>Ahoy</span> there!</p>,
        <p key={"alert_msg_1"}><span>Enjoy</span> Your Stay!</p>,
    ]

    const alertMessage: React.JSX.Element = alertMessages[1]

    const handleSelection = (location: string) => {
        console.log("Handing selection! Location Selected: " + location)
    }

  return (
      <main
          className={"flex flex-col space-y-4 text-black p-4"}
      >
        <Header/>
          {/*Example of passing data as a child to the Alert component (a child component)*/}
          <Alert>
              {alertMessage}
          </Alert>

        <h1>Welcome Aboard!</h1>

        <SearchBarWithFilter/>
        <DestinationList
            destinations={destinations}
            heading="International Destinations (Click To Select)"
            onSelection={handleSelection}
            enableLikeButton={true}
        />
        <DestinationList
            destinations={localDestinations}
            heading="Local Destinations (Click To Select)"
            onSelection={handleSelection}
            enableLikeButton={true}
        />
      </main>
  )
}

export default HomePage;