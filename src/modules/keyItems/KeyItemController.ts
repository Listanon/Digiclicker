import {
    Observable as KnockoutObservable,
} from 'knockout';
import KeyItemType from '../enums/KeyItemType';

export default class KeyItemController {
    private static inspectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Source_Code);
    private static selectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Source_Code);
    private static latestGainedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Source_Code);

    static showGainModal(item: KeyItemType) {
        this.latestGainedItem(item);
        $('.modal').modal('hide');
        $('#keyItemModal').modal({
            backdrop: 'static',
            keyboard: false,
        });
    }

    public static hover(item: KeyItemType) {
        this.inspectedItem(item);
    }

    public static hoverRelease() {
        this.selectedItem(this.inspectedItem());
    }
}
