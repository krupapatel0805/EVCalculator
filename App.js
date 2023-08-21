import { useState, useEffect } from "react"
import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, Button, TextInput } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [gasPrice, setGasPrice] = useState('');
  const [gasMileage, setGasMileage] = useState(NaN);
  const [electricMileage, setElectricMileage] = useState('');
  const [electricCost, setElectricCost] = useState('');
  const [electricCarDistance, setElectricCarDistance] = useState(NaN);
  const [electricCarDistance2, setElectricCarDistance2] = useState(NaN);
  const [selectedSegmentValue, setSelectedSegmentValue] = useState("");
  const [annualGasCost, setAnnualGasCost] = useState('');
  const [annualElectricCost, setAnnualElectricCost] = useState('');
  const [electricCarSavings, setElectricCarSavings] = useState(NaN);
  const [buttonPressed, setButtonPressed] = useState(false);


  {/* Performing calculations for outputs  */ }
  const handleEstimateSavings = () => {

    const parsedGasPrice = parseFloat(gasPrice);
    const parsedElectricMileage = parseFloat(electricMileage);
    const parsedElectricCost = parseFloat(electricCost);

    const electricCarDistance = parsedElectricMileage * (parsedGasPrice / parsedElectricCost);
    setElectricCarDistance(electricCarDistance.toFixed(1));


    const electricCarDistane2 = electricCarDistance - gasMileage
    setElectricCarDistance2(electricCarDistane2.toFixed(1));
  };

  const electricSavingsCalculation = () => {

    const annualGasCost = gasPrice * (parseInt(selectedSegmentValue) / gasMileage);
    setAnnualGasCost(annualGasCost);

    const annualElectricCost = electricCost * (parseInt(selectedSegmentValue) / electricMileage);
    setAnnualElectricCost(annualElectricCost);

    const electricCarSavings = annualGasCost - annualElectricCost;
    if (buttonPressed) {
      setElectricCarSavings(electricCarSavings.toFixed(0));
    }
  }

  useEffect(() => {
    handleEstimateSavings();
    electricSavingsCalculation();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-evenly" }}>
        {/* title of screen */}
        <Text style={{ color: "#222", fontWeight: "bold", fontSize: 30 }}>EV Savings Calculator</Text>

        {/* -------- part 1 -------- */}
        <View>
          <View>
            <Text style={{fontSize:16}}>Gas vehicle information</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 10, marginTop: 10, gap: 10 }}>
              <TextInput
                placeholder="Price per litre (S/L)"
                backgroundColor="#D9DDDC"
                padding={10}
                height={50}
                borderRadius={10}
                flex={1}
                keyboardType="numeric"
                value={gasPrice}
                onChangeText={setGasPrice}
              />
              <TextInput
                placeholder="Gas mileage (km/L)"
                backgroundColor="#D9DDDC"
                padding={10}
                height={50}
                borderRadius={10}
                flex={1}
                keyboardType="numeric"
                value={gasMileage}
                onChangeText={setGasMileage}
              />
            </View>
          </View>

          <View>
            <Text style={{fontSize:16}}>Electric vehicle information</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 10, marginTop: 10, gap: 10 }}>
              <TextInput
                placeholder="Utilities cost ($/kwH)"
                backgroundColor="#D9DDDC"
                padding={10}
                height={50}
                borderRadius={10}
                flex={1}
                keyboardType="numeric"
                value={electricCost}
                onChangeText={setElectricCost}

              />
              <TextInput
                placeholder="EV mileage (km/kwH)"
                backgroundColor="#D9DDDC"
                padding={10}
                height={50}
                borderRadius={10}
                flex={1}
                keyboardType="numeric"
                value={electricMileage}
                onChangeText={setElectricMileage}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{fontSize:16}}>How many km do you drive each year?</Text>
            <SegmentedControl
              style={{ marginTop: 10 }}
              values={["15000", "25000", "40000"]}
              onValueChange={setSelectedSegmentValue}
            />
          </View>

        </View>

        {/* -------- part2 -------- */}
        <View style={{ textAlign: 'center', marginVertical: 8, borderWidth: "2", borderColor: "black", borderRadius: 10, padding: 10, height: 60 }}>
          <Button
            title="Estimate savings"
            color="black"
            onPress={() => {
              electricSavingsCalculation();
              setButtonPressed(true);
            }}
          />
        </View>


        {/* -------- part3 -------- */}
        <Text style={{ fontWeight: "normal", fontSize: 18 }}>For the price of 1 liter of gas, you can travel:</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* box 1 */}
          <View style={{ backgroundColor: "pink", borderRadius: 10, padding: 15, flex: 1 }}>
          <View style={{ flexDirection: "column", color: "black", alignItems: "center" }}>
              <FontAwesome5 name="gas-pump" size={24} />
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{gasMileage}</Text>
              <Text style={{ fontSize: 16, textAlign: "center" }}>km</Text>
            </View>
          </View>

          {/* box 2 */}
          <View style={{ backgroundColor: "cyan", borderRadius: 10, padding: 15, flex: 1 }}>
            <View style={{ flexDirection: "column", color: "black", alignItems: "center" }}>
              <FontAwesome5 name="plug" size={24} />
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{electricCarDistance}</Text>
              <Text style={{ fontSize: 16, textAlign: "center" }}>km</Text>
            </View>
          </View>

          {/* box 3 */}
          <View style={{ backgroundColor: "gold", borderRadius: 10, padding: 15, flex: 1 }}>
          <View style={{ flexDirection: "column", color: "black", alignItems: "center" }}>
              <FontAwesome5 name="arrow-circle-right" size={24} />
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{electricCarDistance2}</Text>
              <Text style={{ fontSize: 16, textAlign: "center" }}>km</Text>
            </View>
          </View>

        </View>


        {/* -------- part4 -------- */}
        <View>
          <Text style={{ color: "black", fontWeight: "normal", fontSize: 18 , textAlign: "center" }}>By switching to electric, you obtain:</Text>
          <View style={{ marginTop: 20 }}>
            <View style={{ backgroundColor: "black", width: 350, height: 100, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 28, color: "white" }}>${electricCarSavings}</Text>
              <Text style={{ fontSize: 22, color: "white" }}>in savings per year</Text>
            </View>
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
