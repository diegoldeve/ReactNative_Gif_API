import { View, Text, TextInput,StyleSheet, TouchableOpacity,Alert, Image,ScrollView } from "react-native";
import { useState } from "react";


export default function App() {

  const [gif, setGif] = useState('');
  const [gifs, setGifs] = useState([])

  const handleSearch = () => {
    if(gif.trim()===''){
      Alert.alert('Necesitas ingresar algo')
      return
    }
    handleBusqueda(gif)
  }

  const handleBusqueda = async (gif) => {
    try {
      let url = `https://api.giphy.com/v1/gifs/search?api_key=aDilkvY1FvfXD3sHwqd4ksbMWC7A9ZVR&q=${gif}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      let data = await fetch(url)
      let res = await data.json();
      setGifs(res.data)
      // console.log(gifs)
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView>
    <View
      style={{
        marginTop:40,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#F1ECE5',
      }}
    >
      <Text>Gif App</Text>
      <TextInput placeholder="¿Qué quieres buscar? " onChangeText={e => setGif(e)} style={styles.input}/>
      <TouchableOpacity style={styles.btn} onPress={handleSearch}><Text>Buscar</Text></TouchableOpacity>
      
      {gifs.map((g,i) => (
        <View key={i}>
          <Image source={{uri:`${g.images.fixed_height.url}`}} style={styles.image}/>
          {/* <Text>{g.title}</Text> */}
        </View>
      ))}
    </View>
      </ScrollView>

  );
}
const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderColor:'black',
    padding:10,
    borderRadius:20,
    margin:10,
  },
  btn:{
    width:60,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#C3C1BC',
    margin:20,
    borderRadius:10
  },
  image:{
    borderRadius:20,
    margin:3,
    width:350,
    height:200,
  }
})
