import styles from './Form.module.css'
import buttonStyles from '@/components/Button/Button.module.css'

import { CamperFilters } from '@/types/camper'
import { makeFisrtUpperCase, makeSpaceSeparated, makeSingular, replaceServerIntoUiName } from '@/lib/labelUtils'

import Button from '../Button/Button'

interface FormProps {
    filters: CamperFilters
    onSubmit: (formData: FormData) => void
}

export default function BookingForm({ filters, onSubmit }: FormProps) {
    return (
        <form action={onSubmit}>
            <div className={styles.location_input_container}>
                <label htmlFor="location" className={styles.label}>
                    Location
                </label>
                <div className={styles.location_input_icon_container}>
                    <svg
                        width="20"
                        height="20"
                        className={styles.location_icon}
                    >
                        <use href="/icon-sprite.svg#icon-icon-map"></use>
                    </svg>

                    <input
                        id="location"
                        type="text"
                        name="location"
                        placeholder="City"
                        className={styles.city_input}
                    />
                </div>
            </div>
            <h2 className={styles.filters_title}>Filters</h2>
            <div className={styles.filters}>
                {Object.entries(filters).map(([filterName, values]) => (
                    <div key={filterName} className={styles.filter_container}>
                        <p className={styles.filter_title_label}>
                            {makeFisrtUpperCase(replaceServerIntoUiName(makeSingular(filterName)))}
                        </p>

                        {values.map((value: string) => (
                            <div key={value} className={styles.filter_value_container}>
                                <input
                                    key={value}
                                    type="radio"
                                    name={makeSingular(filterName)}
                                    value={value}
                                    id={value}
                                    className={styles.radio_input}
                                />
                                <label htmlFor={value} className={styles.filter_value_label}>
                                    {makeFisrtUpperCase(makeSpaceSeparated(value))}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.buttons_container}>
                <Button className={buttonStyles.form_search_button} type='submit'>
                    Search
                </Button>
                <Button className={buttonStyles.form_clear_button} type='reset'>
                    <svg
                        width="24"
                        height="24"
                        className={styles.close_icon}
                    >
                        <use href="/icon-sprite.svg#icon-icon-close"></use>
                    </svg>
                    Clear filters
                </Button>
            </div>
        </form>
    )
}
