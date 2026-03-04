import { Text } from "@react-navigation/elements";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export default function App() {
    const [firstValue, setFirstValue] = useState('');
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState('');
    const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
      return () => {
        soundRef.current?.unloadAsync();
      };
    }, []);

    const handleNumberInput = (num:string) =>{
      if(displayValue == '0'){
        setDisplayValue(num);
      }
          else{
            setDisplayValue(displayValue + num);
          }
        }

  async function playClick() {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/quack.mp3"),
        { shouldPlay: true }
      );
      soundRef.current = sound;
    } catch (e) {
      console.log("Erro com o som:", e);
    }
  }
    
    const handleOperatorInput = (operator: string) =>{
      setOperator(operator);
      setFirstValue(displayValue);
      setDisplayValue('0');
    }

    const handleCanculation = () =>{
      const num1 = parseFloat(firstValue);
      const num2 = parseFloat(displayValue);

      if (operator === '-'){
        setDisplayValue((num1 - num2).toString());
      } else if(operator === '+'){
        setDisplayValue((num1 + num2).toString());
      }else if(operator === '/'){
        setDisplayValue((num1 / num2).toString());
      }else if(operator === '*'){
        setDisplayValue((num1 * num2).toString());
      }else if(operator === '%'){
        setDisplayValue((num1 % num2).toString());
      }
      setOperator('');
      setFirstValue('');
    }

    const handleClear = () =>{
      setDisplayValue('0');
      setOperator('');
      setFirstValue('')
    }

    const handleDelete = () => {
      setDisplayValue(displayValue.slice(0, -1));
    }

  const raizQuadrada = (num: string) => {
    const numero = parseFloat(num);
    const resultado = Math.sqrt(numero);
    setDisplayValue(resultado.toString());
  }

  return (
    <View style={styles.container}>
      <View style={styles.olhos}>
        <View style={styles.olho}>
          <View style={styles.pupilaEsquerda}></View>
        </View>
        <View style={styles.olho}>
          <View style={styles.pupilaDireita}></View>
        </View>
      </View>
    
      <View style={styles.bico}>
        <Text style={{fontSize:50}}>{firstValue + operator}</Text>
        <Text style={{fontSize:80}}>{displayValue}</Text>
        </View>

      <View style={styles.botoes}>
        <View style={styles.coluna1}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleClear()}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>AC</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleDelete()}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>D</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => handleOperatorInput('/')}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>÷</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => raizQuadrada(displayValue)}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>√</Text></ImageBackground></TouchableOpacity>
        </View>
        <View style={styles.coluna2}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('7')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>7</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('8')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>8</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('9')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>9</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleOperatorInput('*')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>*</Text></ImageBackground></TouchableOpacity>
        </View>
        <View style={styles.coluna3}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('4')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>4</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('5')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>5</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('6')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>6</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleOperatorInput('-')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>-</Text></ImageBackground></TouchableOpacity>
        </View>
        <View style={styles.coluna4}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('1')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>1</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('2')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>2</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('3')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>3</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleOperatorInput('+')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>+</Text></ImageBackground></TouchableOpacity>
        </View>

        <View style={styles.coluna3}>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput(',')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>,</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {playClick(); handleNumberInput('0')}}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>0</Text></ImageBackground></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={handleCanculation}><ImageBackground source={require("../assets/images/patinhoQuack.png")} style={styles.imgBtn}><Text style={styles.digito}>=</Text></ImageBackground></TouchableOpacity>
        </View>
      </View>
        <View style={styles.pezinho2}></View>
        <View style={styles.pezinho1}></View>
      </View>
  );

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFDE59",
    height: "100%",
    width: "100%",
    fontFamily: "roboto thin",
    overflow:'hidden'
  },
  olho:{
    backgroundColor:"white",
    height: 300,
    width: 300,
    borderRadius:1000
  },
  pupilaEsquerda:{
    height:180,
    width: 180,
    borderRadius:1000,
    backgroundColor:'black',
    marginTop: '31%',
    marginLeft: '32%'
  },
  pupilaDireita:{
    height:180,
    width: 180,
    borderRadius:1000,
    backgroundColor:'black',
    marginTop: '31%',
    marginLeft: '9%'
  },
  olhos:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:'5%'
  },
  bico:{
    width: "70%",
    height: 180,
    backgroundColor: "#FF7A1A",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    marginTop: 80,
    marginLeft:'15%',
    fontSize:100
  },
  botoes: {
    alignContent:'center',
    justifyContent:'center',
    height: '60%'
  },

  coluna1: {
    flexDirection: "row",
    justifyContent: "space-evenly",


  },

  coluna2: {
    flexDirection: "row",
    justifyContent: "space-evenly",

  },

  coluna3: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  coluna4: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  coluna5: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  TouchableOpacity: {
    height: 200,
    width: 250,
    overflow: "hidden", 
  },

      pezinho1: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 300,
      height: 200,
      backgroundColor: "#FF7A1A",
      borderTopRightRadius: 1000,
      zIndex: -10
    },

    pezinho2: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 300,
      height: 200,
      backgroundColor: "#FF7A1A",
      borderTopLeftRadius: 1000,
      zIndex: -10
    },
    imgBtn: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  imgInside: {
    width: 100,
    height: 100,
  },
  digito:{
    fontSize: 100,
    fontWeight: "bold",
    fontFamily:"BagelFatOne",
    color: "#000",
    
  }
});

