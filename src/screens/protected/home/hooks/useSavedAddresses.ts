// Static mock data (no backend "address book" endpoint exists yet, see
// docs/api.md) — lets the address picker demo a multi-address list without
// waiting on a real API. Picking one only fills the text field below; saving
// still goes through the normal single `profile.address` PUT.
const MOCK_ADDRESSES: string[] = [
  'Nərimanov r., H. Zərdabi küç. 88, Bakı',
  'Yasamal r., Şəriflilər döngəsi 12, Bakı',
  'Nizami r., 28 May küç. 5, Bakı',
  'Xətai r., Heydər Əliyev pr. 141, Bakı',
  'Səbail r., Neftçilər pr. 20, Bakı',
  'Binəqədi r., Hüseyn Cavid pr. 45, Bakı',
  'Nəsimi r., Atatürk pr. 30, Bakı',
  'Qaradağ r., Lökbatan qəs., Bakı',
  'Suraxanı r., 1045, Bakı',
  'Sabunçu r., Bakıxanov qəs., Bakı',
];

/** Address picker's "saved addresses" quick-select list. */
export default function useSavedAddresses() {
  return { addresses: MOCK_ADDRESSES };
}
