# Guía de Uso: UI & Inputs

## Índice

- [INPUTS](#inputs)
  - [SIMPLE INPUT](#simple-input)
  - [INPUT WITH ICON](#input-with-icon)
  - [INPUT WITH PAYMENT ICON](#input-with-payment-icon)
  - [INPUT WITH PREFIX](#input-with-prefix)
  - [PHONE INPUT](#phone-input)
  - [PASSWORD INPUT WITH SHOW/HIDE EYE](#password-input-with-showhide-eye)
- [SELECT INPUTS](#select-inputs)
  - [SIMPLE SELECT](#simple-select)
  - [MULTI SELECT](#multi-select)
- [DATE PICKER](#date-picker)
  - [SIMPLE DATE PICKER](#simple-date-picker)
- [TIME PICKER WITH ICON CLOCK](#time-picker-with-icon-clock)
- [TEXT AREA](#text-area)
  - [TEXT AREA](#text-area-1)
- [FILE INPUT](#file-input)
- [CHECKBOX](#checkbox)
- [RADIO BUTTONS](#radio-buttons)
  - [DEFAULT RADIO BUTTON](#default-radio-button)
  - [SELECTED RADIO BUTTON](#selected-radio-button)
  - [DISABLED RADIO BUTTON](#disabled-radio-button)
- [SWITCH](#switch)
  - [SWITCH WITH COLOR](#switch-with-color)
  - [CHECKED SWITCH](#checked-switch)
  - [DISABLED SWITCH](#disabled-switch)
- [BASIC TABLE](#basic-table)
- [PAGINATION](#pagination)
- [TRANSLATIONS](#translations)
- [ALERTS](#alerts)
  - [WITH READ MORE LINK](#with-read-more-link)
  - [WITHOUT READ MORE LINK](#without-read-more-link)
- [AVATARS](#avatars)
  - [SIMPLE](#simple)
  - [STATUS INDICATOR](#status-indicator)
- [BADGES](#badges)
  - [SIMPLE](#simple-1)
  - [SIMPLE WITH ICON START](#simple-with-icon-start)
  - [SIMPLE WITH ICON END](#simple-with-icon-end)
  - [SOLID](#solid)
  - [SOLID WITH ICON START](#solid-with-icon-start)
  - [SOLID WITH ICON END](#solid-with-icon-end)
- [BUTTONS](#buttons)
  - [PRIMARY BUTTON](#primary-button)
  - [PRIMARY BUTTON WITH START ICON](#primary-button-with-start-icon)
  - [PRIMARY BUTTON WITH END ICON](#primary-button-with-end-icon)
  - [OUTLINE BUTTON](#outline-button)
  - [OUTLINE BUTTON WITH START ICON](#outline-button-with-start-icon)
  - [OUTLINE BUTTON WITH END ICON](#outline-button-with-end-icon)
- [MODAL](#modal)
- [TOOLTIP](#tooltip)

---

## INPUTS

### SIMPLE INPUT

```tsx
<div>
  <Label htmlFor="test">Input</Label>
  <Input type="text" id="test" placeholder="Regular Input" />
</div>
```

### INPUT WITH ICON

```tsx
<div>
  <Label htmlFor="email">Email</Label>
  <div className="relative">
    <Input
      id="email"
      placeholder="info@gmail.com"
      type="text"
      className="ps-[62px]"
    />
    <span className="absolute start-0 top-1/2 -translate-y-1/2 border-e border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
      <EnvelopeIcon />
    </span>
  </div>
</div>
```

### INPUT WITH PAYMENT ICON

```tsx
<div>
  <Label htmlFor="tm">Input with Payment</Label>
  <div className="relative">
    <Input
      type="text"
      placeholder="Card number"
      className="ps-[62px]"
    />
    <span className="absolute start-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-e border-gray-200 dark:border-gray-800">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
        <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
        <path
          d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
          fill="#FC6020"
        />
      </svg>
    </span>
  </div>
</div>
```

### INPUT WITH PREFIX

```tsx
<div>
  <Label>URL</Label>
  <div className="relative">
    <span className="absolute start-0 top-1/2 inline-flex h-11 -translate-y-1/2 items-center justify-center border-e border-gray-200 py-3 ps-3.5 pe-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
      prefix
    </span>
    <Input type="url" placeholder="www.tailadmin.com" className="ps-[90px]" />
  </div>
</div>
```

### PHONE INPUT

```tsx
const handlePhoneNumberChange = (phoneNumber: string) => {
  console.log("Updated phone number:", phoneNumber);
};

<div>
  <Label htmlFor="phone">Phone</Label>
  <PhoneInput
    selectPosition="start"
    countries={countries}
    placeholder="+1 (555) 000-0000"
    onChange={handlePhoneNumberChange}
  />
</div>
```

### PASSWORD INPUT WITH SHOW/HIDE EYE

```tsx
const [showPassword, setShowPassword] = useState(false);

<div>
  <Label htmlFor="pass">Password Input</Label>
  <div className="relative">
    <Input
      id="pass"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      className="pe-10"
    />
    <button
      onClick={() => setShowPassword(!showPassword)}
      className="absolute end-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
    >
      {showPassword ? (
        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
      ) : (
        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
      )}
    </button>
  </div>
</div>
```

---

## SELECT INPUTS

### SIMPLE SELECT

```tsx
const [selectedValues, setSelectedValues] = useState<string[]>([]);

const handleSelectChange = (value: string) => {
  console.log("Selected value:", value);
};

const options = [
  { value: "marketing", label: "Marketing" },
  { value: "template", label: "Template" },
  { value: "development", label: "Development" },
];

<div>
  <Label>Select Input</Label>
  <Select
    options={options}
    placeholder="Select an option"
    onChange={handleSelectChange}
    className="dark:bg-dark-900"
  />
</div>
```

### MULTI SELECT

```tsx
const [selectedValues, setSelectedValues] = useState<string[]>([]);

const handleSelectChange = (value: string) => {
  console.log("Selected value:", value);
};

const multiOptions = [
  { value: "1", text: "Option 1", selected: false },
  { value: "2", text: "Option 2", selected: false },
  { value: "3", text: "Option 3", selected: false },
  { value: "4", text: "Option 4", selected: false },
  { value: "5", text: "Option 5", selected: false },
];

<MultiSelect
  label="Multiple Select Options"
  options={multiOptions}
  defaultSelected={["1", "3"]}
  onChange={(values) => setSelectedValues(values)}
/>
```

---

## DATE PICKER

### SIMPLE DATE PICKER

```tsx
<div>
  <DatePicker
    id="date-picker"
    label="Date Picker Input"
    placeholder="Select a date"
    onChange={(dates, currentDateString) => {
      console.log({ dates, currentDateString });
    }}
  />
</div>
```

---

## TIME PICKER WITH ICON CLOCK

```tsx
<div>
  <Label htmlFor="tm">Time Picker Input</Label>
  <div className="relative">
    <Input
      type="time"
      id="tm"
      name="tm"
      className="pe-10 text-start"
      onChange={(e) => console.log(e.target.value)}
    />
    <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
      <TimeIcon />
    </span>
  </div>
</div>
```

---

## TEXT AREA

### TEXT AREA

```tsx
<div>
  <Label>Description</Label>
  <TextArea
    rows={6}
    value={messageTwo}
    error={false}
    onChange={(value) => setMessageTwo(value)}
    hint="Please enter a valid message."
  />
</div>
```

---

## FILE INPUT

```tsx
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    console.log("Selected file:", file.name);
  }
};

<div>
  <Label>Upload file</Label>
  <FileInput onChange={handleFileChange} className="custom-class" />
</div>
```

---

## CHECKBOX

```tsx
const [isChecked, setIsChecked] = useState(false);

<div className="flex items-center gap-3">
  <Checkbox checked={isChecked} onChange={setIsChecked} />
  <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
    Default
  </span>
</div>
```

---

## RADIO BUTTONS

```tsx
const [selectedValue, setSelectedValue] = useState<string>("option2");

const handleRadioChange = (value: string) => {
  setSelectedValue(value);
};
```

### DEFAULT RADIO BUTTON

```tsx
<Radio
  id="radio1"
  name="group1"
  value="option1"
  checked={selectedValue === "option1"}
  onChange={handleRadioChange}
  label="Default"
/>
```

### SELECTED RADIO BUTTON

```tsx
<Radio
  id="radio2"
  name="group1"
  value="option2"
  checked={selectedValue === "option2"}
  onChange={handleRadioChange}
  label="Selected"
/>
```

### DISABLED RADIO BUTTON

```tsx
<Radio
  id="radio3"
  name="group1"
  value="option3"
  checked={selectedValue === "option3"}
  onChange={handleRadioChange}
  label="Disabled"
  disabled={true}
/>
```

---

## SWITCH

```tsx
const handleSwitchChange = (checked: boolean) => {
  console.log("Switch is now:", checked ? "ON" : "OFF");
};
```

### SWITCH WITH COLOR

```tsx
<Switch
  label="Default"
  defaultChecked={true}
  onChange={handleSwitchChange}
  color="gray"
/>
```

### CHECKED SWITCH

```tsx
<Switch
  label="Checked"
  defaultChecked={true}
  onChange={handleSwitchChange}
  color="gray"
/>
```

### DISABLED SWITCH

```tsx
<Switch label="Disabled" disabled={true} color="gray" />
```

## BASIC TABLE

Data example used for table:

```tsx
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
];
```

Table component:

```tsx
<Table>
  {/* Table Header */}
  <TableHeader className="border-b border-gray-100 dark:border-light-accent/5">
    <TableRow>
      <TableCell
        isHeader
        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
      >
        User
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
      >
        Project Name
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
      >
        Team
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
      >
        Status
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
      >
        Budget
      </TableCell>
    </TableRow>
  </TableHeader>

  {/* Table Body */}
  <TableBody className="divide-y divide-gray-100 dark:divide-light-accent/5">
    {tableData.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="px-5 py-4 text-start sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                width={40}
                height={40}
                src={order.user.image}
                alt={order.user.name}
              />
            </div>
            <div>
              <span className="block text-theme-sm font-medium text-gray-800 dark:text-light-accent/90">
                {order.user.name}
              </span>
              <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                {order.user.role}
              </span>
            </div>
          </div>
        </TableCell>
        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
          {order.projectName}
        </TableCell>
        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
          <div className="flex -space-x-2">
            {order.team.images.map((teamImage, index) => (
              <div
                key={index}
                className="h-6 w-6 overflow-hidden rounded-full border-2 border-light-accent dark:border-gray-900"
              >
                <Image
                  width={24}
                  height={24}
                  src={teamImage}
                  alt={`Team member ${index + 1}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </TableCell>
        <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
          <Badge
            size="sm"
            color={
              order.status === "Active"
                ? "success"
                : order.status === "Pending"
                  ? "warning"
                  : "error"
            }
          >
            {order.status}
          </Badge>
        </TableCell>
        <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
          {order.budget}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## PAGINATION

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(10);

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

## TRANSLATIONS

```tsx
import { useTranslations } from "next-intl";

const t = useTranslations("ecommerce.metrics");
```

## ALERTS

### WITH READ MORE LINK

```tsx
<Alert
  variant="success"
  title="Success Message"
  message="Be cautious when performing this action."
  showLink={true}
  linkHref="/"
  linkText="Learn more"
/>
```

### WITHOUT READ MORE LINK

```tsx
<Alert
  variant="success"
  title="Success Message"
  message="Be cautious when performing this action."
  showLink={false}
/>
```

## AVATARS

### SIMPLE

```tsx
<Avatar src="/images/user/user-01.jpg" size="xxlarge" />
```

### STATUS INDICATOR

```tsx
<Avatar
  src="/images/user/user-01.jpg"
  size="xxlarge"
  status="online"
/>
```

## BADGES

### SIMPLE

```tsx
<Badge variant="light" color="primary">
  Primary
</Badge>
```

### SIMPLE WITH ICON START

```tsx
<Badge variant="light" color="primary" startIcon={<PlusIcon />}>
  Primary
</Badge>
```

### SIMPLE WITH ICON END

```tsx
<Badge variant="light" color="error" endIcon={<PlusIcon />}>
  Error
</Badge>
```

### SOLID

```tsx
<Badge variant="solid" color="primary">
  Primary
</Badge>
```

### SOLID WITH ICON START

```tsx
<Badge variant="solid" color="primary" startIcon={<PlusIcon />}>
  Primary
</Badge>
```

### SOLID WITH ICON END

```tsx
<Badge variant="solid" color="primary" endIcon={<PlusIcon />}>
  Primary
</Badge>
```

## BUTTONS

### PRIMARY BUTTON

```tsx
<Button size="sm" variant="primary">
  Button Text
</Button>
```

### PRIMARY BUTTON WITH START ICON

```tsx
<Button size="md" variant="primary" startIcon={<BoxIcon />}>
  Button Text
</Button>
```

### PRIMARY BUTTON WITH END ICON

```tsx
<Button size="sm" variant="primary" endIcon={<BoxIcon />}>
  Button Text
</Button>
```

### OUTLINE BUTTON

```tsx
<Button size="sm" variant="outline">
  Button Text
</Button>
```

### OUTLINE BUTTON WITH START ICON

```tsx
<Button size="md" variant="outline" startIcon={<BoxIcon />}>
  Button Text
</Button>
```

### OUTLINE BUTTON WITH END ICON

```tsx
<Button size="sm" variant="outline" endIcon={<BoxIcon />}>
  Button Text
</Button>
```

## MODAL

```tsx
const { isOpen, openModal, closeModal } = useModal();

const handleSave = () => {
  // Handle save logic here
  console.log("Saving changes...");
  closeModal();
};

<Modal
  isOpen={isOpen}
  onClose={closeModal}
  className="max-w-150 p-5 lg:p-10"
  isFullscreen={false}
  showCloseButton={false}
>
  <h4 className="mb-7 text-title-sm font-semibold text-gray-800 dark:text-light-accent/90">
    Modal Heading
  </h4>
  <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
    ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
    amet ipsum rutrum feugiat ultrices enim quam.
  </p>
  <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
    ac odio.
  </p>
  <div className="mt-8 flex w-full items-center justify-end gap-3">
    <Button size="sm" variant="outline" onClick={closeModal}>
      Close
    </Button>
    <Button size="sm" onClick={handleSave}>
      Save Changes
    </Button>
  </div>
</Modal>
```

## TOOLTIP

```tsx
<Tooltip content={
    <>
        <button className="bg-gray-dark p-2 rounded-md text-sm text-light" onClick={() => { copyData(p.id); }}>
            {copyTxt}
        </button>
    </>}
    position="top-right" trigger="click">
    <p className="text-sm">{p.id.slice(0, 6) + '...'}</p>
</Tooltip>
```




<!-- Enlace para WhatsApp -->
<a 
  href="https://wa.me/5215555555555?text=Hola%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Enviar mensaje de WhatsApp"
>
  Enviar WhatsApp
</a>