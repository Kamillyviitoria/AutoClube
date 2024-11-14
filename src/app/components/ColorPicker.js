const ColorPicker = ({ label, color, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
      <label style={{ marginBottom: '5px' }}>{label}</label>
      <input type="color" value={color} onChange={onChange} />
    </div>
  );
  
  export default ColorPicker;