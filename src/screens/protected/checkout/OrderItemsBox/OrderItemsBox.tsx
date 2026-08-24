import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './OrderItemsBox.styles';
import type { OrderItemsBoxProps } from './OrderItemsBox.types';

function OrderItemsBox({ items }: OrderItemsBoxProps) {
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);

  return (
    <View
      style={[
        styles.box,
        boxHeight !== undefined && styles.boxFixed,
        boxHeight !== undefined && { height: boxHeight },
      ]}
      onLayout={event => {
        if (boxHeight === undefined) {
          setBoxHeight(event.nativeEvent.layout.height);
        }
      }}
    >
      <View style={styles.boxBackground} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {items.map(item => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.label} numberOfLines={1}>
              {item.quantity} x {item.product.title}
            </Text>
            <Text style={styles.price}>{item.total_price} AZN</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default OrderItemsBox;
