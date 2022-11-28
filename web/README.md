#FastApi Frontend App

## Functionalities

- Search bar

    ![Image](https://raw.github.com/jozefzienowicz/ExampleFastApi/main/images/search_bar.png)

    - Search bar accepts up to 5 characters zip codes, autocomplete is using user 
    favourite zip codes and was created with mui autocomplete component 
    (https://mui.com/material-ui/react-autocomplete/)


- Weather details card

    ![Image](https://raw.github.com/jozefzienowicz/ExampleFastApi/main/images/weather_details.png)
    
    - Weather details card displays Main Weather Description, Temperature, Wind Speed, Pressure, 
    Humidity and Location Name for US zip code. Button "Add to favourites" will associate
    zip code with user, allowing for faster access to it.


- Favourite Zip Codes List

    ![Image](https://raw.github.com/jozefzienowicz/ExampleFastApi/main/images/favourite_zip_codes_list.png)
    
    - Favourite Zip Codes List displays zip codes saved previously by user, clicking on
    one of them will insert zip code into zip code search input and fetch weather data associated
    with it. Favourite Zip code can be deleted by clicking delete button on right
    edge of row 
