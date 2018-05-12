'use strict';

/**@type {{[k: string]: EffectData}} */
let BattleStatuses = {

solarsnow: {
		name: 'SolarSnow',
		id: 'solarsnow',
		num: 0,
		effectType: 'Weather',
		duration: 5,
		durationCallback: function (source, effect) {
			if (source && (source.hasItem('icyrock') || source.hasItem('heatrock'))) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage: function (damage, attacker, defender, move) {
			if (move.type === 'Fire' && !(defender.hasType('Grass') || defender.hasType('Fire') || defender.hasType('Ice'))) {
				this.debug('Solar Snow fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Solar Snow water suppress');
				return this.chainModify(0.5);
			}
		},
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-weather', 'SolarSnow', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'SolarSnow');
				this.add('SolarSnow');
			}
		},
		onResidualOrder: 1,
		onResidual: function () {
			this.add('-weather', 'SolarSnow', '[upkeep]');
			if (this.isWeather('solarsnow')) this.eachEvent('Weather');
		},
		onWeather: function (target) {
         if (!target.hasType('Grass') && !target.hasType('Fire') && !target.hasType('Ice')){
			  this.damage(target.maxhp / 16);
                        }
		},
		onEnd: function () {
			this.add('-weather', 'none');
		},
	},
  };

shadowdance: {
    name: 'ShadowDance',
    id: 'shadowdance',
    num: 0,
    effectType: 'Weather',
    duration: 5,
    durationCallback: function(source, effect) {
        if (source && (source.hasItem('damprock'))) {
            return 8;
        }
        return 5;
    },
    onWeatherModifyDamage: function(damage, attacker, defender, move) {
        if (move.type === 'Ghost') {
            this.debug('Spirit Storm ghost boost');
            return this.chainModify(1.5);
        }
    },
    onStart: function(battle, source, effect) {
        if (effect && effect.effectType === 'Ability') {
            if (this.gen <= 5) this.effectData.duration = 0;
            this.add('-weather', 'ShadowDance', '[from] ability: ' + effect, '[of] ' + source);
        } else {
            this.add('-weather', 'ShadowDance');
            this.add('ShadowDance');
        }
    },
    onResidualOrder: 1,
    onResidual: function() {
        this.add('-weather', 'ShadowDance', '[upkeep]');
        if (this.isWeather('shadowdance')) this.eachEvent('Weather');
    },
    onWeather: function(target) {
        if (!target.hasType('Water') && !target.hasType('Ghost')) {
            for (const moveSlot of target.moveSlots) {
                moveSlot.pp = moveSlot.pp - 2;
            }
        }
    },
    onEnd: function() {
        this.add('-weather', 'none');
    },
},
};

exports.BattleStatuses = BattleStatuses;
