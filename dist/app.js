"use strict";
(() => {
  // js/emojiMap.ts
  var EMOJI_MAP = {
    "\u{1F600}": ":grinning:",
    "\u{1F603}": ":smiley:",
    "\u{1F604}": ":smile:",
    "\u{1F601}": ":grin:",
    "\u{1F606}": ":laughing:",
    "\u{1F605}": ":sweat_smile:",
    "\u{1F923}": ":rofl:",
    "\u{1F602}": ":joy:",
    "\u{1F642}": ":slightly_smiling_face:",
    "\u{1F643}": ":upside_down_face:",
    "\u{1FAE0}": ":melting_face:",
    "\u{1F609}": ":wink:",
    "\u{1F60A}": ":blush:",
    "\u{1F607}": ":innocent:",
    "\u{1F970}": ":smiling_face_with_three_hearts:",
    "\u{1F60D}": ":heart_eyes:",
    "\u{1F929}": ":star_struck:",
    "\u{1F618}": ":kissing_heart:",
    "\u{1F617}": ":kissing:",
    "\u263A\uFE0F": ":relaxed:",
    "\u{1F61A}": ":kissing_closed_eyes:",
    "\u{1F619}": ":kissing_smiling_eyes:",
    "\u{1F972}": ":smiling_face_with_tear:",
    "\u{1F60B}": ":yum:",
    "\u{1F61B}": ":stuck_out_tongue:",
    "\u{1F61C}": ":stuck_out_tongue_winking_eye:",
    "\u{1F92A}": ":zany_face:",
    "\u{1F61D}": ":stuck_out_tongue_closed_eyes:",
    "\u{1F911}": ":money_mouth_face:",
    "\u{1F917}": ":hugs:",
    "\u{1F92D}": ":hand_over_mouth:",
    "\u{1FAE2}": ":face_with_open_eyes_and_hand_over_mouth:",
    "\u{1FAE3}": ":face_with_peeking_eye:",
    "\u{1F92B}": ":shushing_face:",
    "\u{1F914}": ":thinking:",
    "\u{1FAE1}": ":saluting_face:",
    "\u{1F910}": ":zipper_mouth_face:",
    "\u{1F928}": ":raised_eyebrow:",
    "\u{1F610}": ":neutral_face:",
    "\u{1F611}": ":expressionless:",
    "\u{1F636}": ":no_mouth:",
    "\u{1FAE5}": ":dotted_line_face:",
    "\u{1F636}\u200D\u{1F32B}\uFE0F": ":face_in_clouds:",
    "\u{1F60F}": ":smirk:",
    "\u{1F612}": ":unamused:",
    "\u{1F644}": ":roll_eyes:",
    "\u{1F62C}": ":grimacing:",
    "\u{1F62E}\u200D\u{1F4A8}": ":face_exhaling:",
    "\u{1F925}": ":lying_face:",
    "\u{1FAE8}": ":shaking_face:",
    "\u{1F60C}": ":relieved:",
    "\u{1F614}": ":pensive:",
    "\u{1F62A}": ":sleepy:",
    "\u{1F924}": ":drooling_face:",
    "\u{1F634}": ":sleeping:",
    "\u{1F637}": ":mask:",
    "\u{1F912}": ":face_with_thermometer:",
    "\u{1F915}": ":face_with_head_bandage:",
    "\u{1F922}": ":nauseated_face:",
    "\u{1F92E}": ":vomiting_face:",
    "\u{1F927}": ":sneezing_face:",
    "\u{1F975}": ":hot_face:",
    "\u{1F976}": ":cold_face:",
    "\u{1F974}": ":woozy_face:",
    "\u{1F635}": ":dizzy_face:",
    "\u{1F635}\u200D\u{1F4AB}": ":face_with_spiral_eyes:",
    "\u{1F92F}": ":exploding_head:",
    "\u{1F920}": ":cowboy_hat_face:",
    "\u{1F973}": ":partying_face:",
    "\u{1F978}": ":disguised_face:",
    "\u{1F60E}": ":sunglasses:",
    "\u{1F913}": ":nerd_face:",
    "\u{1F9D0}": ":monocle_face:",
    "\u{1F615}": ":confused:",
    "\u{1FAE4}": ":face_with_diagonal_mouth:",
    "\u{1F61F}": ":worried:",
    "\u{1F641}": ":slightly_frowning_face:",
    "\u2639\uFE0F": ":frowning_face:",
    "\u{1F62E}": ":open_mouth:",
    "\u{1F62F}": ":hushed:",
    "\u{1F632}": ":astonished:",
    "\u{1F633}": ":flushed:",
    "\u{1F97A}": ":pleading_face:",
    "\u{1F979}": ":face_holding_back_tears:",
    "\u{1F626}": ":frowning:",
    "\u{1F627}": ":anguished:",
    "\u{1F628}": ":fearful:",
    "\u{1F630}": ":cold_sweat:",
    "\u{1F625}": ":disappointed_relieved:",
    "\u{1F622}": ":cry:",
    "\u{1F62D}": ":sob:",
    "\u{1F631}": ":scream:",
    "\u{1F616}": ":confounded:",
    "\u{1F623}": ":persevere:",
    "\u{1F61E}": ":disappointed:",
    "\u{1F613}": ":sweat:",
    "\u{1F629}": ":weary:",
    "\u{1F62B}": ":tired_face:",
    "\u{1F971}": ":yawning_face:",
    "\u{1F624}": ":triumph:",
    "\u{1F621}": ":rage:",
    "\u{1F620}": ":angry:",
    "\u{1F92C}": ":cursing_face:",
    "\u{1F608}": ":smiling_imp:",
    "\u{1F47F}": ":imp:",
    "\u{1F480}": ":skull:",
    "\u2620\uFE0F": ":skull_and_crossbones:",
    "\u{1F4A9}": ":hankey:",
    "\u{1F921}": ":clown_face:",
    "\u{1F479}": ":japanese_ogre:",
    "\u{1F47A}": ":japanese_goblin:",
    "\u{1F47B}": ":ghost:",
    "\u{1F47D}": ":alien:",
    "\u{1F47E}": ":space_invader:",
    "\u{1F916}": ":robot:",
    "\u{1F63A}": ":smiley_cat:",
    "\u{1F638}": ":smile_cat:",
    "\u{1F639}": ":joy_cat:",
    "\u{1F63B}": ":heart_eyes_cat:",
    "\u{1F63C}": ":smirk_cat:",
    "\u{1F63D}": ":kissing_cat:",
    "\u{1F640}": ":scream_cat:",
    "\u{1F63F}": ":crying_cat_face:",
    "\u{1F63E}": ":pouting_cat:",
    "\u{1F648}": ":see_no_evil:",
    "\u{1F649}": ":hear_no_evil:",
    "\u{1F64A}": ":speak_no_evil:",
    "\u{1F48C}": ":love_letter:",
    "\u{1F498}": ":cupid:",
    "\u{1F49D}": ":gift_heart:",
    "\u{1F496}": ":sparkling_heart:",
    "\u{1F497}": ":heartpulse:",
    "\u{1F493}": ":heartbeat:",
    "\u{1F49E}": ":revolving_hearts:",
    "\u{1F495}": ":two_hearts:",
    "\u{1F49F}": ":heart_decoration:",
    "\u2763\uFE0F": ":heavy_heart_exclamation:",
    "\u{1F494}": ":broken_heart:",
    "\u2764\uFE0F\u200D\u{1F525}": ":heart_on_fire:",
    "\u2764\uFE0F\u200D\u{1FA79}": ":mending_heart:",
    "\u2764\uFE0F": ":heart:",
    "\u{1FA77}": ":pink_heart:",
    "\u{1F9E1}": ":orange_heart:",
    "\u{1F49B}": ":yellow_heart:",
    "\u{1F49A}": ":green_heart:",
    "\u{1F499}": ":blue_heart:",
    "\u{1FA75}": ":light_blue_heart:",
    "\u{1F49C}": ":purple_heart:",
    "\u{1F90E}": ":brown_heart:",
    "\u{1F5A4}": ":black_heart:",
    "\u{1FA76}": ":grey_heart:",
    "\u{1F90D}": ":white_heart:",
    "\u{1F48B}": ":kiss:",
    "\u{1F4AF}": ":100:",
    "\u{1F4A2}": ":anger:",
    "\u{1F4A5}": ":boom:",
    "\u{1F4AB}": ":dizzy:",
    "\u{1F4A6}": ":sweat_drops:",
    "\u{1F4A8}": ":dash:",
    "\u{1F573}\uFE0F": ":hole:",
    "\u{1F4AC}": ":speech_balloon:",
    "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F": ":eye_speech_bubble:",
    "\u{1F5E8}\uFE0F": ":left_speech_bubble:",
    "\u{1F5EF}\uFE0F": ":right_anger_bubble:",
    "\u{1F4AD}": ":thought_balloon:",
    "\u{1F4A4}": ":zzz:",
    "\u{1F44B}": ":wave:",
    "\u{1F91A}": ":raised_back_of_hand:",
    "\u{1F590}\uFE0F": ":raised_hand_with_fingers_splayed:",
    "\u270B": ":hand:",
    "\u{1F596}": ":vulcan_salute:",
    "\u{1FAF1}": ":rightwards_hand:",
    "\u{1FAF2}": ":leftwards_hand:",
    "\u{1FAF3}": ":palm_down_hand:",
    "\u{1FAF4}": ":palm_up_hand:",
    "\u{1FAF7}": ":leftwards_pushing_hand:",
    "\u{1FAF8}": ":rightwards_pushing_hand:",
    "\u{1F44C}": ":ok_hand:",
    "\u{1F90C}": ":pinched_fingers:",
    "\u{1F90F}": ":pinching_hand:",
    "\u270C\uFE0F": ":v:",
    "\u{1F91E}": ":crossed_fingers:",
    "\u{1FAF0}": ":hand_with_index_finger_and_thumb_crossed:",
    "\u{1F91F}": ":love_you_gesture:",
    "\u{1F918}": ":metal:",
    "\u{1F919}": ":call_me_hand:",
    "\u{1F448}": ":point_left:",
    "\u{1F449}": ":point_right:",
    "\u{1F446}": ":point_up_2:",
    "\u{1F595}": ":middle_finger:",
    "\u{1F447}": ":point_down:",
    "\u261D\uFE0F": ":point_up:",
    "\u{1FAF5}": ":index_pointing_at_the_viewer:",
    "\u{1F44D}": ":+1:",
    "\u{1F44E}": ":-1:",
    "\u270A": ":fist_raised:",
    "\u{1F44A}": ":fist_oncoming:",
    "\u{1F91B}": ":fist_left:",
    "\u{1F91C}": ":fist_right:",
    "\u{1F44F}": ":clap:",
    "\u{1F64C}": ":raised_hands:",
    "\u{1FAF6}": ":heart_hands:",
    "\u{1F450}": ":open_hands:",
    "\u{1F932}": ":palms_up_together:",
    "\u{1F91D}": ":handshake:",
    "\u{1F64F}": ":pray:",
    "\u270D\uFE0F": ":writing_hand:",
    "\u{1F485}": ":nail_care:",
    "\u{1F933}": ":selfie:",
    "\u{1F4AA}": ":muscle:",
    "\u{1F9BE}": ":mechanical_arm:",
    "\u{1F9BF}": ":mechanical_leg:",
    "\u{1F9B5}": ":leg:",
    "\u{1F9B6}": ":foot:",
    "\u{1F442}": ":ear:",
    "\u{1F9BB}": ":ear_with_hearing_aid:",
    "\u{1F443}": ":nose:",
    "\u{1F9E0}": ":brain:",
    "\u{1FAC0}": ":anatomical_heart:",
    "\u{1FAC1}": ":lungs:",
    "\u{1F9B7}": ":tooth:",
    "\u{1F9B4}": ":bone:",
    "\u{1F440}": ":eyes:",
    "\u{1F441}\uFE0F": ":eye:",
    "\u{1F445}": ":tongue:",
    "\u{1F444}": ":lips:",
    "\u{1FAE6}": ":biting_lip:",
    "\u{1F476}": ":baby:",
    "\u{1F9D2}": ":child:",
    "\u{1F466}": ":boy:",
    "\u{1F467}": ":girl:",
    "\u{1F9D1}": ":adult:",
    "\u{1F471}": ":blond_haired_person:",
    "\u{1F468}": ":man:",
    "\u{1F9D4}": ":bearded_person:",
    "\u{1F9D4}\u200D\u2642\uFE0F": ":man_beard:",
    "\u{1F9D4}\u200D\u2640\uFE0F": ":woman_beard:",
    "\u{1F468}\u200D\u{1F9B0}": ":red_haired_man:",
    "\u{1F468}\u200D\u{1F9B1}": ":curly_haired_man:",
    "\u{1F468}\u200D\u{1F9B3}": ":white_haired_man:",
    "\u{1F468}\u200D\u{1F9B2}": ":bald_man:",
    "\u{1F469}": ":woman:",
    "\u{1F469}\u200D\u{1F9B0}": ":red_haired_woman:",
    "\u{1F9D1}\u200D\u{1F9B0}": ":person_red_hair:",
    "\u{1F469}\u200D\u{1F9B1}": ":curly_haired_woman:",
    "\u{1F9D1}\u200D\u{1F9B1}": ":person_curly_hair:",
    "\u{1F469}\u200D\u{1F9B3}": ":white_haired_woman:",
    "\u{1F9D1}\u200D\u{1F9B3}": ":person_white_hair:",
    "\u{1F469}\u200D\u{1F9B2}": ":bald_woman:",
    "\u{1F9D1}\u200D\u{1F9B2}": ":person_bald:",
    "\u{1F471}\u200D\u2640\uFE0F": ":blond_haired_woman:",
    "\u{1F471}\u200D\u2642\uFE0F": ":blond_haired_man:",
    "\u{1F9D3}": ":older_adult:",
    "\u{1F474}": ":older_man:",
    "\u{1F475}": ":older_woman:",
    "\u{1F64D}": ":frowning_person:",
    "\u{1F64D}\u200D\u2642\uFE0F": ":frowning_man:",
    "\u{1F64D}\u200D\u2640\uFE0F": ":frowning_woman:",
    "\u{1F64E}": ":pouting_face:",
    "\u{1F64E}\u200D\u2642\uFE0F": ":pouting_man:",
    "\u{1F64E}\u200D\u2640\uFE0F": ":pouting_woman:",
    "\u{1F645}": ":no_good:",
    "\u{1F645}\u200D\u2642\uFE0F": ":no_good_man:",
    "\u{1F645}\u200D\u2640\uFE0F": ":no_good_woman:",
    "\u{1F646}": ":ok_person:",
    "\u{1F646}\u200D\u2642\uFE0F": ":ok_man:",
    "\u{1F646}\u200D\u2640\uFE0F": ":ok_woman:",
    "\u{1F481}": ":tipping_hand_person:",
    "\u{1F481}\u200D\u2642\uFE0F": ":tipping_hand_man:",
    "\u{1F481}\u200D\u2640\uFE0F": ":tipping_hand_woman:",
    "\u{1F64B}": ":raising_hand:",
    "\u{1F64B}\u200D\u2642\uFE0F": ":raising_hand_man:",
    "\u{1F64B}\u200D\u2640\uFE0F": ":raising_hand_woman:",
    "\u{1F9CF}": ":deaf_person:",
    "\u{1F9CF}\u200D\u2642\uFE0F": ":deaf_man:",
    "\u{1F9CF}\u200D\u2640\uFE0F": ":deaf_woman:",
    "\u{1F647}": ":bow:",
    "\u{1F647}\u200D\u2642\uFE0F": ":bowing_man:",
    "\u{1F647}\u200D\u2640\uFE0F": ":bowing_woman:",
    "\u{1F926}": ":facepalm:",
    "\u{1F926}\u200D\u2642\uFE0F": ":man_facepalming:",
    "\u{1F926}\u200D\u2640\uFE0F": ":woman_facepalming:",
    "\u{1F937}": ":shrug:",
    "\u{1F937}\u200D\u2642\uFE0F": ":man_shrugging:",
    "\u{1F937}\u200D\u2640\uFE0F": ":woman_shrugging:",
    "\u{1F9D1}\u200D\u2695\uFE0F": ":health_worker:",
    "\u{1F468}\u200D\u2695\uFE0F": ":man_health_worker:",
    "\u{1F469}\u200D\u2695\uFE0F": ":woman_health_worker:",
    "\u{1F9D1}\u200D\u{1F393}": ":student:",
    "\u{1F468}\u200D\u{1F393}": ":man_student:",
    "\u{1F469}\u200D\u{1F393}": ":woman_student:",
    "\u{1F9D1}\u200D\u{1F3EB}": ":teacher:",
    "\u{1F468}\u200D\u{1F3EB}": ":man_teacher:",
    "\u{1F469}\u200D\u{1F3EB}": ":woman_teacher:",
    "\u{1F9D1}\u200D\u2696\uFE0F": ":judge:",
    "\u{1F468}\u200D\u2696\uFE0F": ":man_judge:",
    "\u{1F469}\u200D\u2696\uFE0F": ":woman_judge:",
    "\u{1F9D1}\u200D\u{1F33E}": ":farmer:",
    "\u{1F468}\u200D\u{1F33E}": ":man_farmer:",
    "\u{1F469}\u200D\u{1F33E}": ":woman_farmer:",
    "\u{1F9D1}\u200D\u{1F373}": ":cook:",
    "\u{1F468}\u200D\u{1F373}": ":man_cook:",
    "\u{1F469}\u200D\u{1F373}": ":woman_cook:",
    "\u{1F9D1}\u200D\u{1F527}": ":mechanic:",
    "\u{1F468}\u200D\u{1F527}": ":man_mechanic:",
    "\u{1F469}\u200D\u{1F527}": ":woman_mechanic:",
    "\u{1F9D1}\u200D\u{1F3ED}": ":factory_worker:",
    "\u{1F468}\u200D\u{1F3ED}": ":man_factory_worker:",
    "\u{1F469}\u200D\u{1F3ED}": ":woman_factory_worker:",
    "\u{1F9D1}\u200D\u{1F4BC}": ":office_worker:",
    "\u{1F468}\u200D\u{1F4BC}": ":man_office_worker:",
    "\u{1F469}\u200D\u{1F4BC}": ":woman_office_worker:",
    "\u{1F9D1}\u200D\u{1F52C}": ":scientist:",
    "\u{1F468}\u200D\u{1F52C}": ":man_scientist:",
    "\u{1F469}\u200D\u{1F52C}": ":woman_scientist:",
    "\u{1F9D1}\u200D\u{1F4BB}": ":technologist:",
    "\u{1F468}\u200D\u{1F4BB}": ":man_technologist:",
    "\u{1F469}\u200D\u{1F4BB}": ":woman_technologist:",
    "\u{1F9D1}\u200D\u{1F3A4}": ":singer:",
    "\u{1F468}\u200D\u{1F3A4}": ":man_singer:",
    "\u{1F469}\u200D\u{1F3A4}": ":woman_singer:",
    "\u{1F9D1}\u200D\u{1F3A8}": ":artist:",
    "\u{1F468}\u200D\u{1F3A8}": ":man_artist:",
    "\u{1F469}\u200D\u{1F3A8}": ":woman_artist:",
    "\u{1F9D1}\u200D\u2708\uFE0F": ":pilot:",
    "\u{1F468}\u200D\u2708\uFE0F": ":man_pilot:",
    "\u{1F469}\u200D\u2708\uFE0F": ":woman_pilot:",
    "\u{1F9D1}\u200D\u{1F680}": ":astronaut:",
    "\u{1F468}\u200D\u{1F680}": ":man_astronaut:",
    "\u{1F469}\u200D\u{1F680}": ":woman_astronaut:",
    "\u{1F9D1}\u200D\u{1F692}": ":firefighter:",
    "\u{1F468}\u200D\u{1F692}": ":man_firefighter:",
    "\u{1F469}\u200D\u{1F692}": ":woman_firefighter:",
    "\u{1F46E}": ":police_officer:",
    "\u{1F46E}\u200D\u2642\uFE0F": ":policeman:",
    "\u{1F46E}\u200D\u2640\uFE0F": ":policewoman:",
    "\u{1F575}\uFE0F": ":detective:",
    "\u{1F575}\uFE0F\u200D\u2642\uFE0F": ":male_detective:",
    "\u{1F575}\uFE0F\u200D\u2640\uFE0F": ":female_detective:",
    "\u{1F482}": ":guard:",
    "\u{1F482}\u200D\u2642\uFE0F": ":guardsman:",
    "\u{1F482}\u200D\u2640\uFE0F": ":guardswoman:",
    "\u{1F977}": ":ninja:",
    "\u{1F477}": ":construction_worker:",
    "\u{1F477}\u200D\u2642\uFE0F": ":construction_worker_man:",
    "\u{1F477}\u200D\u2640\uFE0F": ":construction_worker_woman:",
    "\u{1FAC5}": ":person_with_crown:",
    "\u{1F934}": ":prince:",
    "\u{1F478}": ":princess:",
    "\u{1F473}": ":person_with_turban:",
    "\u{1F473}\u200D\u2642\uFE0F": ":man_with_turban:",
    "\u{1F473}\u200D\u2640\uFE0F": ":woman_with_turban:",
    "\u{1F472}": ":man_with_gua_pi_mao:",
    "\u{1F9D5}": ":woman_with_headscarf:",
    "\u{1F935}": ":person_in_tuxedo:",
    "\u{1F935}\u200D\u2642\uFE0F": ":man_in_tuxedo:",
    "\u{1F935}\u200D\u2640\uFE0F": ":woman_in_tuxedo:",
    "\u{1F470}": ":person_with_veil:",
    "\u{1F470}\u200D\u2642\uFE0F": ":man_with_veil:",
    "\u{1F470}\u200D\u2640\uFE0F": ":woman_with_veil:",
    "\u{1F930}": ":pregnant_woman:",
    "\u{1FAC3}": ":pregnant_man:",
    "\u{1FAC4}": ":pregnant_person:",
    "\u{1F931}": ":breast_feeding:",
    "\u{1F469}\u200D\u{1F37C}": ":woman_feeding_baby:",
    "\u{1F468}\u200D\u{1F37C}": ":man_feeding_baby:",
    "\u{1F9D1}\u200D\u{1F37C}": ":person_feeding_baby:",
    "\u{1F47C}": ":angel:",
    "\u{1F385}": ":santa:",
    "\u{1F936}": ":mrs_claus:",
    "\u{1F9D1}\u200D\u{1F384}": ":mx_claus:",
    "\u{1F9B8}": ":superhero:",
    "\u{1F9B8}\u200D\u2642\uFE0F": ":superhero_man:",
    "\u{1F9B8}\u200D\u2640\uFE0F": ":superhero_woman:",
    "\u{1F9B9}": ":supervillain:",
    "\u{1F9B9}\u200D\u2642\uFE0F": ":supervillain_man:",
    "\u{1F9B9}\u200D\u2640\uFE0F": ":supervillain_woman:",
    "\u{1F9D9}": ":mage:",
    "\u{1F9D9}\u200D\u2642\uFE0F": ":mage_man:",
    "\u{1F9D9}\u200D\u2640\uFE0F": ":mage_woman:",
    "\u{1F9DA}": ":fairy:",
    "\u{1F9DA}\u200D\u2642\uFE0F": ":fairy_man:",
    "\u{1F9DA}\u200D\u2640\uFE0F": ":fairy_woman:",
    "\u{1F9DB}": ":vampire:",
    "\u{1F9DB}\u200D\u2642\uFE0F": ":vampire_man:",
    "\u{1F9DB}\u200D\u2640\uFE0F": ":vampire_woman:",
    "\u{1F9DC}": ":merperson:",
    "\u{1F9DC}\u200D\u2642\uFE0F": ":merman:",
    "\u{1F9DC}\u200D\u2640\uFE0F": ":mermaid:",
    "\u{1F9DD}": ":elf:",
    "\u{1F9DD}\u200D\u2642\uFE0F": ":elf_man:",
    "\u{1F9DD}\u200D\u2640\uFE0F": ":elf_woman:",
    "\u{1F9DE}": ":genie:",
    "\u{1F9DE}\u200D\u2642\uFE0F": ":genie_man:",
    "\u{1F9DE}\u200D\u2640\uFE0F": ":genie_woman:",
    "\u{1F9DF}": ":zombie:",
    "\u{1F9DF}\u200D\u2642\uFE0F": ":zombie_man:",
    "\u{1F9DF}\u200D\u2640\uFE0F": ":zombie_woman:",
    "\u{1F9CC}": ":troll:",
    "\u{1F486}": ":massage:",
    "\u{1F486}\u200D\u2642\uFE0F": ":massage_man:",
    "\u{1F486}\u200D\u2640\uFE0F": ":massage_woman:",
    "\u{1F487}": ":haircut:",
    "\u{1F487}\u200D\u2642\uFE0F": ":haircut_man:",
    "\u{1F487}\u200D\u2640\uFE0F": ":haircut_woman:",
    "\u{1F6B6}": ":walking:",
    "\u{1F6B6}\u200D\u2642\uFE0F": ":walking_man:",
    "\u{1F6B6}\u200D\u2640\uFE0F": ":walking_woman:",
    "\u{1F9CD}": ":standing_person:",
    "\u{1F9CD}\u200D\u2642\uFE0F": ":standing_man:",
    "\u{1F9CD}\u200D\u2640\uFE0F": ":standing_woman:",
    "\u{1F9CE}": ":kneeling_person:",
    "\u{1F9CE}\u200D\u2642\uFE0F": ":kneeling_man:",
    "\u{1F9CE}\u200D\u2640\uFE0F": ":kneeling_woman:",
    "\u{1F9D1}\u200D\u{1F9AF}": ":person_with_probing_cane:",
    "\u{1F468}\u200D\u{1F9AF}": ":man_with_probing_cane:",
    "\u{1F469}\u200D\u{1F9AF}": ":woman_with_probing_cane:",
    "\u{1F9D1}\u200D\u{1F9BC}": ":person_in_motorized_wheelchair:",
    "\u{1F468}\u200D\u{1F9BC}": ":man_in_motorized_wheelchair:",
    "\u{1F469}\u200D\u{1F9BC}": ":woman_in_motorized_wheelchair:",
    "\u{1F9D1}\u200D\u{1F9BD}": ":person_in_manual_wheelchair:",
    "\u{1F468}\u200D\u{1F9BD}": ":man_in_manual_wheelchair:",
    "\u{1F469}\u200D\u{1F9BD}": ":woman_in_manual_wheelchair:",
    "\u{1F3C3}": ":runner:",
    "\u{1F3C3}\u200D\u2642\uFE0F": ":running_man:",
    "\u{1F3C3}\u200D\u2640\uFE0F": ":running_woman:",
    "\u{1F483}": ":woman_dancing:",
    "\u{1F57A}": ":man_dancing:",
    "\u{1F574}\uFE0F": ":business_suit_levitating:",
    "\u{1F46F}": ":dancers:",
    "\u{1F46F}\u200D\u2642\uFE0F": ":dancing_men:",
    "\u{1F46F}\u200D\u2640\uFE0F": ":dancing_women:",
    "\u{1F9D6}": ":sauna_person:",
    "\u{1F9D6}\u200D\u2642\uFE0F": ":sauna_man:",
    "\u{1F9D6}\u200D\u2640\uFE0F": ":sauna_woman:",
    "\u{1F9D7}": ":climbing:",
    "\u{1F9D7}\u200D\u2642\uFE0F": ":climbing_man:",
    "\u{1F9D7}\u200D\u2640\uFE0F": ":climbing_woman:",
    "\u{1F93A}": ":person_fencing:",
    "\u{1F3C7}": ":horse_racing:",
    "\u26F7\uFE0F": ":skier:",
    "\u{1F3C2}": ":snowboarder:",
    "\u{1F3CC}\uFE0F": ":golfing:",
    "\u{1F3CC}\uFE0F\u200D\u2642\uFE0F": ":golfing_man:",
    "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F": ":golfing_woman:",
    "\u{1F3C4}": ":surfer:",
    "\u{1F3C4}\u200D\u2642\uFE0F": ":surfing_man:",
    "\u{1F3C4}\u200D\u2640\uFE0F": ":surfing_woman:",
    "\u{1F6A3}": ":rowboat:",
    "\u{1F6A3}\u200D\u2642\uFE0F": ":rowing_man:",
    "\u{1F6A3}\u200D\u2640\uFE0F": ":rowing_woman:",
    "\u{1F3CA}": ":swimmer:",
    "\u{1F3CA}\u200D\u2642\uFE0F": ":swimming_man:",
    "\u{1F3CA}\u200D\u2640\uFE0F": ":swimming_woman:",
    "\u26F9\uFE0F": ":bouncing_ball_person:",
    "\u26F9\uFE0F\u200D\u2642\uFE0F": ":bouncing_ball_man:",
    "\u26F9\uFE0F\u200D\u2640\uFE0F": ":bouncing_ball_woman:",
    "\u{1F3CB}\uFE0F": ":weight_lifting:",
    "\u{1F3CB}\uFE0F\u200D\u2642\uFE0F": ":weight_lifting_man:",
    "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F": ":weight_lifting_woman:",
    "\u{1F6B4}": ":bicyclist:",
    "\u{1F6B4}\u200D\u2642\uFE0F": ":biking_man:",
    "\u{1F6B4}\u200D\u2640\uFE0F": ":biking_woman:",
    "\u{1F6B5}": ":mountain_bicyclist:",
    "\u{1F6B5}\u200D\u2642\uFE0F": ":mountain_biking_man:",
    "\u{1F6B5}\u200D\u2640\uFE0F": ":mountain_biking_woman:",
    "\u{1F938}": ":cartwheeling:",
    "\u{1F938}\u200D\u2642\uFE0F": ":man_cartwheeling:",
    "\u{1F938}\u200D\u2640\uFE0F": ":woman_cartwheeling:",
    "\u{1F93C}": ":wrestling:",
    "\u{1F93C}\u200D\u2642\uFE0F": ":men_wrestling:",
    "\u{1F93C}\u200D\u2640\uFE0F": ":women_wrestling:",
    "\u{1F93D}": ":water_polo:",
    "\u{1F93D}\u200D\u2642\uFE0F": ":man_playing_water_polo:",
    "\u{1F93D}\u200D\u2640\uFE0F": ":woman_playing_water_polo:",
    "\u{1F93E}": ":handball_person:",
    "\u{1F93E}\u200D\u2642\uFE0F": ":man_playing_handball:",
    "\u{1F93E}\u200D\u2640\uFE0F": ":woman_playing_handball:",
    "\u{1F939}": ":juggling_person:",
    "\u{1F939}\u200D\u2642\uFE0F": ":man_juggling:",
    "\u{1F939}\u200D\u2640\uFE0F": ":woman_juggling:",
    "\u{1F9D8}": ":lotus_position:",
    "\u{1F9D8}\u200D\u2642\uFE0F": ":lotus_position_man:",
    "\u{1F9D8}\u200D\u2640\uFE0F": ":lotus_position_woman:",
    "\u{1F6C0}": ":bath:",
    "\u{1F6CC}": ":sleeping_bed:",
    "\u{1F9D1}\u200D\u{1F91D}\u200D\u{1F9D1}": ":people_holding_hands:",
    "\u{1F46D}": ":two_women_holding_hands:",
    "\u{1F46B}": ":couple:",
    "\u{1F46C}": ":two_men_holding_hands:",
    "\u{1F48F}": ":couplekiss:",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}": ":couplekiss_man_woman:",
    "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}": ":couplekiss_man_man:",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}": ":couplekiss_woman_woman:",
    "\u{1F491}": ":couple_with_heart:",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F468}": ":couple_with_heart_woman_man:",
    "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}": ":couple_with_heart_man_man:",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}": ":couple_with_heart_woman_woman:",
    "\u{1F46A}": ":family:",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}": ":family_man_woman_boy:",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}": ":family_man_woman_girl:",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}": ":family_man_woman_girl_boy:",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}": ":family_man_woman_boy_boy:",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}": ":family_man_woman_girl_girl:",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}": ":family_man_man_boy:",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}": ":family_man_man_girl:",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}": ":family_man_man_girl_boy:",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}": ":family_man_man_boy_boy:",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}": ":family_man_man_girl_girl:",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}": ":family_woman_woman_boy:",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}": ":family_woman_woman_girl:",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}": ":family_woman_woman_girl_boy:",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}": ":family_woman_woman_boy_boy:",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}": ":family_woman_woman_girl_girl:",
    "\u{1F468}\u200D\u{1F466}": ":family_man_boy:",
    "\u{1F468}\u200D\u{1F466}\u200D\u{1F466}": ":family_man_boy_boy:",
    "\u{1F468}\u200D\u{1F467}": ":family_man_girl:",
    "\u{1F468}\u200D\u{1F467}\u200D\u{1F466}": ":family_man_girl_boy:",
    "\u{1F468}\u200D\u{1F467}\u200D\u{1F467}": ":family_man_girl_girl:",
    "\u{1F469}\u200D\u{1F466}": ":family_woman_boy:",
    "\u{1F469}\u200D\u{1F466}\u200D\u{1F466}": ":family_woman_boy_boy:",
    "\u{1F469}\u200D\u{1F467}": ":family_woman_girl:",
    "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}": ":family_woman_girl_boy:",
    "\u{1F469}\u200D\u{1F467}\u200D\u{1F467}": ":family_woman_girl_girl:",
    "\u{1F5E3}\uFE0F": ":speaking_head:",
    "\u{1F464}": ":bust_in_silhouette:",
    "\u{1F465}": ":busts_in_silhouette:",
    "\u{1FAC2}": ":people_hugging:",
    "\u{1F463}": ":footprints:",
    "\u{1F435}": ":monkey_face:",
    "\u{1F412}": ":monkey:",
    "\u{1F98D}": ":gorilla:",
    "\u{1F9A7}": ":orangutan:",
    "\u{1F436}": ":dog:",
    "\u{1F415}": ":dog2:",
    "\u{1F9AE}": ":guide_dog:",
    "\u{1F415}\u200D\u{1F9BA}": ":service_dog:",
    "\u{1F429}": ":poodle:",
    "\u{1F43A}": ":wolf:",
    "\u{1F98A}": ":fox_face:",
    "\u{1F99D}": ":raccoon:",
    "\u{1F431}": ":cat:",
    "\u{1F408}": ":cat2:",
    "\u{1F408}\u200D\u2B1B": ":black_cat:",
    "\u{1F981}": ":lion:",
    "\u{1F42F}": ":tiger:",
    "\u{1F405}": ":tiger2:",
    "\u{1F406}": ":leopard:",
    "\u{1F434}": ":horse:",
    "\u{1FACE}": ":moose:",
    "\u{1FACF}": ":donkey:",
    "\u{1F40E}": ":racehorse:",
    "\u{1F984}": ":unicorn:",
    "\u{1F993}": ":zebra:",
    "\u{1F98C}": ":deer:",
    "\u{1F9AC}": ":bison:",
    "\u{1F42E}": ":cow:",
    "\u{1F402}": ":ox:",
    "\u{1F403}": ":water_buffalo:",
    "\u{1F404}": ":cow2:",
    "\u{1F437}": ":pig:",
    "\u{1F416}": ":pig2:",
    "\u{1F417}": ":boar:",
    "\u{1F43D}": ":pig_nose:",
    "\u{1F40F}": ":ram:",
    "\u{1F411}": ":sheep:",
    "\u{1F410}": ":goat:",
    "\u{1F42A}": ":dromedary_camel:",
    "\u{1F42B}": ":camel:",
    "\u{1F999}": ":llama:",
    "\u{1F992}": ":giraffe:",
    "\u{1F418}": ":elephant:",
    "\u{1F9A3}": ":mammoth:",
    "\u{1F98F}": ":rhinoceros:",
    "\u{1F99B}": ":hippopotamus:",
    "\u{1F42D}": ":mouse:",
    "\u{1F401}": ":mouse2:",
    "\u{1F400}": ":rat:",
    "\u{1F439}": ":hamster:",
    "\u{1F430}": ":rabbit:",
    "\u{1F407}": ":rabbit2:",
    "\u{1F43F}\uFE0F": ":chipmunk:",
    "\u{1F9AB}": ":beaver:",
    "\u{1F994}": ":hedgehog:",
    "\u{1F987}": ":bat:",
    "\u{1F43B}": ":bear:",
    "\u{1F43B}\u200D\u2744\uFE0F": ":polar_bear:",
    "\u{1F428}": ":koala:",
    "\u{1F43C}": ":panda_face:",
    "\u{1F9A5}": ":sloth:",
    "\u{1F9A6}": ":otter:",
    "\u{1F9A8}": ":skunk:",
    "\u{1F998}": ":kangaroo:",
    "\u{1F9A1}": ":badger:",
    "\u{1F43E}": ":feet:",
    "\u{1F983}": ":turkey:",
    "\u{1F414}": ":chicken:",
    "\u{1F413}": ":rooster:",
    "\u{1F423}": ":hatching_chick:",
    "\u{1F424}": ":baby_chick:",
    "\u{1F425}": ":hatched_chick:",
    "\u{1F426}": ":bird:",
    "\u{1F427}": ":penguin:",
    "\u{1F54A}\uFE0F": ":dove:",
    "\u{1F985}": ":eagle:",
    "\u{1F986}": ":duck:",
    "\u{1F9A2}": ":swan:",
    "\u{1F989}": ":owl:",
    "\u{1F9A4}": ":dodo:",
    "\u{1FAB6}": ":feather:",
    "\u{1F9A9}": ":flamingo:",
    "\u{1F99A}": ":peacock:",
    "\u{1F99C}": ":parrot:",
    "\u{1FABD}": ":wing:",
    "\u{1F426}\u200D\u2B1B": ":black_bird:",
    "\u{1FABF}": ":goose:",
    "\u{1F438}": ":frog:",
    "\u{1F40A}": ":crocodile:",
    "\u{1F422}": ":turtle:",
    "\u{1F98E}": ":lizard:",
    "\u{1F40D}": ":snake:",
    "\u{1F432}": ":dragon_face:",
    "\u{1F409}": ":dragon:",
    "\u{1F995}": ":sauropod:",
    "\u{1F996}": ":t-rex:",
    "\u{1F433}": ":whale:",
    "\u{1F40B}": ":whale2:",
    "\u{1F42C}": ":dolphin:",
    "\u{1F9AD}": ":seal:",
    "\u{1F41F}": ":fish:",
    "\u{1F420}": ":tropical_fish:",
    "\u{1F421}": ":blowfish:",
    "\u{1F988}": ":shark:",
    "\u{1F419}": ":octopus:",
    "\u{1F41A}": ":shell:",
    "\u{1FAB8}": ":coral:",
    "\u{1FABC}": ":jellyfish:",
    "\u{1F40C}": ":snail:",
    "\u{1F98B}": ":butterfly:",
    "\u{1F41B}": ":bug:",
    "\u{1F41C}": ":ant:",
    "\u{1F41D}": ":bee:",
    "\u{1FAB2}": ":beetle:",
    "\u{1F41E}": ":lady_beetle:",
    "\u{1F997}": ":cricket:",
    "\u{1FAB3}": ":cockroach:",
    "\u{1F577}\uFE0F": ":spider:",
    "\u{1F578}\uFE0F": ":spider_web:",
    "\u{1F982}": ":scorpion:",
    "\u{1F99F}": ":mosquito:",
    "\u{1FAB0}": ":fly:",
    "\u{1FAB1}": ":worm:",
    "\u{1F9A0}": ":microbe:",
    "\u{1F490}": ":bouquet:",
    "\u{1F338}": ":cherry_blossom:",
    "\u{1F4AE}": ":white_flower:",
    "\u{1FAB7}": ":lotus:",
    "\u{1F3F5}\uFE0F": ":rosette:",
    "\u{1F339}": ":rose:",
    "\u{1F940}": ":wilted_flower:",
    "\u{1F33A}": ":hibiscus:",
    "\u{1F33B}": ":sunflower:",
    "\u{1F33C}": ":blossom:",
    "\u{1F337}": ":tulip:",
    "\u{1FABB}": ":hyacinth:",
    "\u{1F331}": ":seedling:",
    "\u{1FAB4}": ":potted_plant:",
    "\u{1F332}": ":evergreen_tree:",
    "\u{1F333}": ":deciduous_tree:",
    "\u{1F334}": ":palm_tree:",
    "\u{1F335}": ":cactus:",
    "\u{1F33E}": ":ear_of_rice:",
    "\u{1F33F}": ":herb:",
    "\u2618\uFE0F": ":shamrock:",
    "\u{1F340}": ":four_leaf_clover:",
    "\u{1F341}": ":maple_leaf:",
    "\u{1F342}": ":fallen_leaf:",
    "\u{1F343}": ":leaves:",
    "\u{1FAB9}": ":empty_nest:",
    "\u{1FABA}": ":nest_with_eggs:",
    "\u{1F344}": ":mushroom:",
    "\u{1F347}": ":grapes:",
    "\u{1F348}": ":melon:",
    "\u{1F349}": ":watermelon:",
    "\u{1F34A}": ":tangerine:",
    "\u{1F34B}": ":lemon:",
    "\u{1F34C}": ":banana:",
    "\u{1F34D}": ":pineapple:",
    "\u{1F96D}": ":mango:",
    "\u{1F34E}": ":apple:",
    "\u{1F34F}": ":green_apple:",
    "\u{1F350}": ":pear:",
    "\u{1F351}": ":peach:",
    "\u{1F352}": ":cherries:",
    "\u{1F353}": ":strawberry:",
    "\u{1FAD0}": ":blueberries:",
    "\u{1F95D}": ":kiwi_fruit:",
    "\u{1F345}": ":tomato:",
    "\u{1FAD2}": ":olive:",
    "\u{1F965}": ":coconut:",
    "\u{1F951}": ":avocado:",
    "\u{1F346}": ":eggplant:",
    "\u{1F954}": ":potato:",
    "\u{1F955}": ":carrot:",
    "\u{1F33D}": ":corn:",
    "\u{1F336}\uFE0F": ":hot_pepper:",
    "\u{1FAD1}": ":bell_pepper:",
    "\u{1F952}": ":cucumber:",
    "\u{1F96C}": ":leafy_green:",
    "\u{1F966}": ":broccoli:",
    "\u{1F9C4}": ":garlic:",
    "\u{1F9C5}": ":onion:",
    "\u{1F95C}": ":peanuts:",
    "\u{1FAD8}": ":beans:",
    "\u{1F330}": ":chestnut:",
    "\u{1FADA}": ":ginger_root:",
    "\u{1FADB}": ":pea_pod:",
    "\u{1F35E}": ":bread:",
    "\u{1F950}": ":croissant:",
    "\u{1F956}": ":baguette_bread:",
    "\u{1FAD3}": ":flatbread:",
    "\u{1F968}": ":pretzel:",
    "\u{1F96F}": ":bagel:",
    "\u{1F95E}": ":pancakes:",
    "\u{1F9C7}": ":waffle:",
    "\u{1F9C0}": ":cheese:",
    "\u{1F356}": ":meat_on_bone:",
    "\u{1F357}": ":poultry_leg:",
    "\u{1F969}": ":cut_of_meat:",
    "\u{1F953}": ":bacon:",
    "\u{1F354}": ":hamburger:",
    "\u{1F35F}": ":fries:",
    "\u{1F355}": ":pizza:",
    "\u{1F32D}": ":hotdog:",
    "\u{1F96A}": ":sandwich:",
    "\u{1F32E}": ":taco:",
    "\u{1F32F}": ":burrito:",
    "\u{1FAD4}": ":tamale:",
    "\u{1F959}": ":stuffed_flatbread:",
    "\u{1F9C6}": ":falafel:",
    "\u{1F95A}": ":egg:",
    "\u{1F373}": ":fried_egg:",
    "\u{1F958}": ":shallow_pan_of_food:",
    "\u{1F372}": ":stew:",
    "\u{1FAD5}": ":fondue:",
    "\u{1F963}": ":bowl_with_spoon:",
    "\u{1F957}": ":green_salad:",
    "\u{1F37F}": ":popcorn:",
    "\u{1F9C8}": ":butter:",
    "\u{1F9C2}": ":salt:",
    "\u{1F96B}": ":canned_food:",
    "\u{1F371}": ":bento:",
    "\u{1F358}": ":rice_cracker:",
    "\u{1F359}": ":rice_ball:",
    "\u{1F35A}": ":rice:",
    "\u{1F35B}": ":curry:",
    "\u{1F35C}": ":ramen:",
    "\u{1F35D}": ":spaghetti:",
    "\u{1F360}": ":sweet_potato:",
    "\u{1F362}": ":oden:",
    "\u{1F363}": ":sushi:",
    "\u{1F364}": ":fried_shrimp:",
    "\u{1F365}": ":fish_cake:",
    "\u{1F96E}": ":moon_cake:",
    "\u{1F361}": ":dango:",
    "\u{1F95F}": ":dumpling:",
    "\u{1F960}": ":fortune_cookie:",
    "\u{1F961}": ":takeout_box:",
    "\u{1F980}": ":crab:",
    "\u{1F99E}": ":lobster:",
    "\u{1F990}": ":shrimp:",
    "\u{1F991}": ":squid:",
    "\u{1F9AA}": ":oyster:",
    "\u{1F366}": ":icecream:",
    "\u{1F367}": ":shaved_ice:",
    "\u{1F368}": ":ice_cream:",
    "\u{1F369}": ":doughnut:",
    "\u{1F36A}": ":cookie:",
    "\u{1F382}": ":birthday:",
    "\u{1F370}": ":cake:",
    "\u{1F9C1}": ":cupcake:",
    "\u{1F967}": ":pie:",
    "\u{1F36B}": ":chocolate_bar:",
    "\u{1F36C}": ":candy:",
    "\u{1F36D}": ":lollipop:",
    "\u{1F36E}": ":custard:",
    "\u{1F36F}": ":honey_pot:",
    "\u{1F37C}": ":baby_bottle:",
    "\u{1F95B}": ":milk_glass:",
    "\u2615": ":coffee:",
    "\u{1FAD6}": ":teapot:",
    "\u{1F375}": ":tea:",
    "\u{1F376}": ":sake:",
    "\u{1F37E}": ":champagne:",
    "\u{1F377}": ":wine_glass:",
    "\u{1F378}": ":cocktail:",
    "\u{1F379}": ":tropical_drink:",
    "\u{1F37A}": ":beer:",
    "\u{1F37B}": ":beers:",
    "\u{1F942}": ":clinking_glasses:",
    "\u{1F943}": ":tumbler_glass:",
    "\u{1FAD7}": ":pouring_liquid:",
    "\u{1F964}": ":cup_with_straw:",
    "\u{1F9CB}": ":bubble_tea:",
    "\u{1F9C3}": ":beverage_box:",
    "\u{1F9C9}": ":mate:",
    "\u{1F9CA}": ":ice_cube:",
    "\u{1F962}": ":chopsticks:",
    "\u{1F37D}\uFE0F": ":plate_with_cutlery:",
    "\u{1F374}": ":fork_and_knife:",
    "\u{1F944}": ":spoon:",
    "\u{1F52A}": ":hocho:",
    "\u{1FAD9}": ":jar:",
    "\u{1F3FA}": ":amphora:",
    "\u{1F30D}": ":earth_africa:",
    "\u{1F30E}": ":earth_americas:",
    "\u{1F30F}": ":earth_asia:",
    "\u{1F310}": ":globe_with_meridians:",
    "\u{1F5FA}\uFE0F": ":world_map:",
    "\u{1F5FE}": ":japan:",
    "\u{1F9ED}": ":compass:",
    "\u{1F3D4}\uFE0F": ":mountain_snow:",
    "\u26F0\uFE0F": ":mountain:",
    "\u{1F30B}": ":volcano:",
    "\u{1F5FB}": ":mount_fuji:",
    "\u{1F3D5}\uFE0F": ":camping:",
    "\u{1F3D6}\uFE0F": ":beach_umbrella:",
    "\u{1F3DC}\uFE0F": ":desert:",
    "\u{1F3DD}\uFE0F": ":desert_island:",
    "\u{1F3DE}\uFE0F": ":national_park:",
    "\u{1F3DF}\uFE0F": ":stadium:",
    "\u{1F3DB}\uFE0F": ":classical_building:",
    "\u{1F3D7}\uFE0F": ":building_construction:",
    "\u{1F9F1}": ":bricks:",
    "\u{1FAA8}": ":rock:",
    "\u{1FAB5}": ":wood:",
    "\u{1F6D6}": ":hut:",
    "\u{1F3D8}\uFE0F": ":houses:",
    "\u{1F3DA}\uFE0F": ":derelict_house:",
    "\u{1F3E0}": ":house:",
    "\u{1F3E1}": ":house_with_garden:",
    "\u{1F3E2}": ":office:",
    "\u{1F3E3}": ":post_office:",
    "\u{1F3E4}": ":european_post_office:",
    "\u{1F3E5}": ":hospital:",
    "\u{1F3E6}": ":bank:",
    "\u{1F3E8}": ":hotel:",
    "\u{1F3E9}": ":love_hotel:",
    "\u{1F3EA}": ":convenience_store:",
    "\u{1F3EB}": ":school:",
    "\u{1F3EC}": ":department_store:",
    "\u{1F3ED}": ":factory:",
    "\u{1F3EF}": ":japanese_castle:",
    "\u{1F3F0}": ":european_castle:",
    "\u{1F492}": ":wedding:",
    "\u{1F5FC}": ":tokyo_tower:",
    "\u{1F5FD}": ":statue_of_liberty:",
    "\u26EA": ":church:",
    "\u{1F54C}": ":mosque:",
    "\u{1F6D5}": ":hindu_temple:",
    "\u{1F54D}": ":synagogue:",
    "\u26E9\uFE0F": ":shinto_shrine:",
    "\u{1F54B}": ":kaaba:",
    "\u26F2": ":fountain:",
    "\u26FA": ":tent:",
    "\u{1F301}": ":foggy:",
    "\u{1F303}": ":night_with_stars:",
    "\u{1F3D9}\uFE0F": ":cityscape:",
    "\u{1F304}": ":sunrise_over_mountains:",
    "\u{1F305}": ":sunrise:",
    "\u{1F306}": ":city_sunset:",
    "\u{1F307}": ":city_sunrise:",
    "\u{1F309}": ":bridge_at_night:",
    "\u2668\uFE0F": ":hotsprings:",
    "\u{1F3A0}": ":carousel_horse:",
    "\u{1F6DD}": ":playground_slide:",
    "\u{1F3A1}": ":ferris_wheel:",
    "\u{1F3A2}": ":roller_coaster:",
    "\u{1F488}": ":barber:",
    "\u{1F3AA}": ":circus_tent:",
    "\u{1F682}": ":steam_locomotive:",
    "\u{1F683}": ":railway_car:",
    "\u{1F684}": ":bullettrain_side:",
    "\u{1F685}": ":bullettrain_front:",
    "\u{1F686}": ":train2:",
    "\u{1F687}": ":metro:",
    "\u{1F688}": ":light_rail:",
    "\u{1F689}": ":station:",
    "\u{1F68A}": ":tram:",
    "\u{1F69D}": ":monorail:",
    "\u{1F69E}": ":mountain_railway:",
    "\u{1F68B}": ":train:",
    "\u{1F68C}": ":bus:",
    "\u{1F68D}": ":oncoming_bus:",
    "\u{1F68E}": ":trolleybus:",
    "\u{1F690}": ":minibus:",
    "\u{1F691}": ":ambulance:",
    "\u{1F692}": ":fire_engine:",
    "\u{1F693}": ":police_car:",
    "\u{1F694}": ":oncoming_police_car:",
    "\u{1F695}": ":taxi:",
    "\u{1F696}": ":oncoming_taxi:",
    "\u{1F697}": ":car:",
    "\u{1F698}": ":oncoming_automobile:",
    "\u{1F699}": ":blue_car:",
    "\u{1F6FB}": ":pickup_truck:",
    "\u{1F69A}": ":truck:",
    "\u{1F69B}": ":articulated_lorry:",
    "\u{1F69C}": ":tractor:",
    "\u{1F3CE}\uFE0F": ":racing_car:",
    "\u{1F3CD}\uFE0F": ":motorcycle:",
    "\u{1F6F5}": ":motor_scooter:",
    "\u{1F9BD}": ":manual_wheelchair:",
    "\u{1F9BC}": ":motorized_wheelchair:",
    "\u{1F6FA}": ":auto_rickshaw:",
    "\u{1F6B2}": ":bike:",
    "\u{1F6F4}": ":kick_scooter:",
    "\u{1F6F9}": ":skateboard:",
    "\u{1F6FC}": ":roller_skate:",
    "\u{1F68F}": ":busstop:",
    "\u{1F6E3}\uFE0F": ":motorway:",
    "\u{1F6E4}\uFE0F": ":railway_track:",
    "\u{1F6E2}\uFE0F": ":oil_drum:",
    "\u26FD": ":fuelpump:",
    "\u{1F6DE}": ":wheel:",
    "\u{1F6A8}": ":rotating_light:",
    "\u{1F6A5}": ":traffic_light:",
    "\u{1F6A6}": ":vertical_traffic_light:",
    "\u{1F6D1}": ":stop_sign:",
    "\u{1F6A7}": ":construction:",
    "\u2693": ":anchor:",
    "\u{1F6DF}": ":ring_buoy:",
    "\u26F5": ":boat:",
    "\u{1F6F6}": ":canoe:",
    "\u{1F6A4}": ":speedboat:",
    "\u{1F6F3}\uFE0F": ":passenger_ship:",
    "\u26F4\uFE0F": ":ferry:",
    "\u{1F6E5}\uFE0F": ":motor_boat:",
    "\u{1F6A2}": ":ship:",
    "\u2708\uFE0F": ":airplane:",
    "\u{1F6E9}\uFE0F": ":small_airplane:",
    "\u{1F6EB}": ":flight_departure:",
    "\u{1F6EC}": ":flight_arrival:",
    "\u{1FA82}": ":parachute:",
    "\u{1F4BA}": ":seat:",
    "\u{1F681}": ":helicopter:",
    "\u{1F69F}": ":suspension_railway:",
    "\u{1F6A0}": ":mountain_cableway:",
    "\u{1F6A1}": ":aerial_tramway:",
    "\u{1F6F0}\uFE0F": ":artificial_satellite:",
    "\u{1F680}": ":rocket:",
    "\u{1F6F8}": ":flying_saucer:",
    "\u{1F6CE}\uFE0F": ":bellhop_bell:",
    "\u{1F9F3}": ":luggage:",
    "\u231B": ":hourglass:",
    "\u23F3": ":hourglass_flowing_sand:",
    "\u231A": ":watch:",
    "\u23F0": ":alarm_clock:",
    "\u23F1\uFE0F": ":stopwatch:",
    "\u23F2\uFE0F": ":timer_clock:",
    "\u{1F570}\uFE0F": ":mantelpiece_clock:",
    "\u{1F55B}": ":clock12:",
    "\u{1F567}": ":clock1230:",
    "\u{1F550}": ":clock1:",
    "\u{1F55C}": ":clock130:",
    "\u{1F551}": ":clock2:",
    "\u{1F55D}": ":clock230:",
    "\u{1F552}": ":clock3:",
    "\u{1F55E}": ":clock330:",
    "\u{1F553}": ":clock4:",
    "\u{1F55F}": ":clock430:",
    "\u{1F554}": ":clock5:",
    "\u{1F560}": ":clock530:",
    "\u{1F555}": ":clock6:",
    "\u{1F561}": ":clock630:",
    "\u{1F556}": ":clock7:",
    "\u{1F562}": ":clock730:",
    "\u{1F557}": ":clock8:",
    "\u{1F563}": ":clock830:",
    "\u{1F558}": ":clock9:",
    "\u{1F564}": ":clock930:",
    "\u{1F559}": ":clock10:",
    "\u{1F565}": ":clock1030:",
    "\u{1F55A}": ":clock11:",
    "\u{1F566}": ":clock1130:",
    "\u{1F311}": ":new_moon:",
    "\u{1F312}": ":waxing_crescent_moon:",
    "\u{1F313}": ":first_quarter_moon:",
    "\u{1F314}": ":moon:",
    "\u{1F315}": ":full_moon:",
    "\u{1F316}": ":waning_gibbous_moon:",
    "\u{1F317}": ":last_quarter_moon:",
    "\u{1F318}": ":waning_crescent_moon:",
    "\u{1F319}": ":crescent_moon:",
    "\u{1F31A}": ":new_moon_with_face:",
    "\u{1F31B}": ":first_quarter_moon_with_face:",
    "\u{1F31C}": ":last_quarter_moon_with_face:",
    "\u{1F321}\uFE0F": ":thermometer:",
    "\u2600\uFE0F": ":sunny:",
    "\u{1F31D}": ":full_moon_with_face:",
    "\u{1F31E}": ":sun_with_face:",
    "\u{1FA90}": ":ringed_planet:",
    "\u2B50": ":star:",
    "\u{1F31F}": ":star2:",
    "\u{1F320}": ":stars:",
    "\u{1F30C}": ":milky_way:",
    "\u2601\uFE0F": ":cloud:",
    "\u26C5": ":partly_sunny:",
    "\u26C8\uFE0F": ":cloud_with_lightning_and_rain:",
    "\u{1F324}\uFE0F": ":sun_behind_small_cloud:",
    "\u{1F325}\uFE0F": ":sun_behind_large_cloud:",
    "\u{1F326}\uFE0F": ":sun_behind_rain_cloud:",
    "\u{1F327}\uFE0F": ":cloud_with_rain:",
    "\u{1F328}\uFE0F": ":cloud_with_snow:",
    "\u{1F329}\uFE0F": ":cloud_with_lightning:",
    "\u{1F32A}\uFE0F": ":tornado:",
    "\u{1F32B}\uFE0F": ":fog:",
    "\u{1F32C}\uFE0F": ":wind_face:",
    "\u{1F300}": ":cyclone:",
    "\u{1F308}": ":rainbow:",
    "\u{1F302}": ":closed_umbrella:",
    "\u2602\uFE0F": ":open_umbrella:",
    "\u2614": ":umbrella:",
    "\u26F1\uFE0F": ":parasol_on_ground:",
    "\u26A1": ":zap:",
    "\u2744\uFE0F": ":snowflake:",
    "\u2603\uFE0F": ":snowman_with_snow:",
    "\u26C4": ":snowman:",
    "\u2604\uFE0F": ":comet:",
    "\u{1F525}": ":fire:",
    "\u{1F4A7}": ":droplet:",
    "\u{1F30A}": ":ocean:",
    "\u{1F383}": ":jack_o_lantern:",
    "\u{1F384}": ":christmas_tree:",
    "\u{1F386}": ":fireworks:",
    "\u{1F387}": ":sparkler:",
    "\u{1F9E8}": ":firecracker:",
    "\u2728": ":sparkles:",
    "\u{1F388}": ":balloon:",
    "\u{1F389}": ":tada:",
    "\u{1F38A}": ":confetti_ball:",
    "\u{1F38B}": ":tanabata_tree:",
    "\u{1F38D}": ":bamboo:",
    "\u{1F38E}": ":dolls:",
    "\u{1F38F}": ":flags:",
    "\u{1F390}": ":wind_chime:",
    "\u{1F391}": ":rice_scene:",
    "\u{1F9E7}": ":red_envelope:",
    "\u{1F380}": ":ribbon:",
    "\u{1F381}": ":gift:",
    "\u{1F397}\uFE0F": ":reminder_ribbon:",
    "\u{1F39F}\uFE0F": ":tickets:",
    "\u{1F3AB}": ":ticket:",
    "\u{1F396}\uFE0F": ":medal_military:",
    "\u{1F3C6}": ":trophy:",
    "\u{1F3C5}": ":medal_sports:",
    "\u{1F947}": ":1st_place_medal:",
    "\u{1F948}": ":2nd_place_medal:",
    "\u{1F949}": ":3rd_place_medal:",
    "\u26BD": ":soccer:",
    "\u26BE": ":baseball:",
    "\u{1F94E}": ":softball:",
    "\u{1F3C0}": ":basketball:",
    "\u{1F3D0}": ":volleyball:",
    "\u{1F3C8}": ":football:",
    "\u{1F3C9}": ":rugby_football:",
    "\u{1F3BE}": ":tennis:",
    "\u{1F94F}": ":flying_disc:",
    "\u{1F3B3}": ":bowling:",
    "\u{1F3CF}": ":cricket_game:",
    "\u{1F3D1}": ":field_hockey:",
    "\u{1F3D2}": ":ice_hockey:",
    "\u{1F94D}": ":lacrosse:",
    "\u{1F3D3}": ":ping_pong:",
    "\u{1F3F8}": ":badminton:",
    "\u{1F94A}": ":boxing_glove:",
    "\u{1F94B}": ":martial_arts_uniform:",
    "\u{1F945}": ":goal_net:",
    "\u26F3": ":golf:",
    "\u26F8\uFE0F": ":ice_skate:",
    "\u{1F3A3}": ":fishing_pole_and_fish:",
    "\u{1F93F}": ":diving_mask:",
    "\u{1F3BD}": ":running_shirt_with_sash:",
    "\u{1F3BF}": ":ski:",
    "\u{1F6F7}": ":sled:",
    "\u{1F94C}": ":curling_stone:",
    "\u{1F3AF}": ":dart:",
    "\u{1FA80}": ":yo_yo:",
    "\u{1FA81}": ":kite:",
    "\u{1F52B}": ":gun:",
    "\u{1F3B1}": ":8ball:",
    "\u{1F52E}": ":crystal_ball:",
    "\u{1FA84}": ":magic_wand:",
    "\u{1F3AE}": ":video_game:",
    "\u{1F579}\uFE0F": ":joystick:",
    "\u{1F3B0}": ":slot_machine:",
    "\u{1F3B2}": ":game_die:",
    "\u{1F9E9}": ":jigsaw:",
    "\u{1F9F8}": ":teddy_bear:",
    "\u{1FA85}": ":pinata:",
    "\u{1FAA9}": ":mirror_ball:",
    "\u{1FA86}": ":nesting_dolls:",
    "\u2660\uFE0F": ":spades:",
    "\u2665\uFE0F": ":hearts:",
    "\u2666\uFE0F": ":diamonds:",
    "\u2663\uFE0F": ":clubs:",
    "\u265F\uFE0F": ":chess_pawn:",
    "\u{1F0CF}": ":black_joker:",
    "\u{1F004}": ":mahjong:",
    "\u{1F3B4}": ":flower_playing_cards:",
    "\u{1F3AD}": ":performing_arts:",
    "\u{1F5BC}\uFE0F": ":framed_picture:",
    "\u{1F3A8}": ":art:",
    "\u{1F9F5}": ":thread:",
    "\u{1FAA1}": ":sewing_needle:",
    "\u{1F9F6}": ":yarn:",
    "\u{1FAA2}": ":knot:",
    "\u{1F453}": ":eyeglasses:",
    "\u{1F576}\uFE0F": ":dark_sunglasses:",
    "\u{1F97D}": ":goggles:",
    "\u{1F97C}": ":lab_coat:",
    "\u{1F9BA}": ":safety_vest:",
    "\u{1F454}": ":necktie:",
    "\u{1F455}": ":shirt:",
    "\u{1F456}": ":jeans:",
    "\u{1F9E3}": ":scarf:",
    "\u{1F9E4}": ":gloves:",
    "\u{1F9E5}": ":coat:",
    "\u{1F9E6}": ":socks:",
    "\u{1F457}": ":dress:",
    "\u{1F458}": ":kimono:",
    "\u{1F97B}": ":sari:",
    "\u{1FA71}": ":one_piece_swimsuit:",
    "\u{1FA72}": ":swim_brief:",
    "\u{1FA73}": ":shorts:",
    "\u{1F459}": ":bikini:",
    "\u{1F45A}": ":womans_clothes:",
    "\u{1FAAD}": ":folding_hand_fan:",
    "\u{1F45B}": ":purse:",
    "\u{1F45C}": ":handbag:",
    "\u{1F45D}": ":pouch:",
    "\u{1F6CD}\uFE0F": ":shopping:",
    "\u{1F392}": ":school_satchel:",
    "\u{1FA74}": ":thong_sandal:",
    "\u{1F45E}": ":mans_shoe:",
    "\u{1F45F}": ":athletic_shoe:",
    "\u{1F97E}": ":hiking_boot:",
    "\u{1F97F}": ":flat_shoe:",
    "\u{1F460}": ":high_heel:",
    "\u{1F461}": ":sandal:",
    "\u{1FA70}": ":ballet_shoes:",
    "\u{1F462}": ":boot:",
    "\u{1FAAE}": ":hair_pick:",
    "\u{1F451}": ":crown:",
    "\u{1F452}": ":womans_hat:",
    "\u{1F3A9}": ":tophat:",
    "\u{1F393}": ":mortar_board:",
    "\u{1F9E2}": ":billed_cap:",
    "\u{1FA96}": ":military_helmet:",
    "\u26D1\uFE0F": ":rescue_worker_helmet:",
    "\u{1F4FF}": ":prayer_beads:",
    "\u{1F484}": ":lipstick:",
    "\u{1F48D}": ":ring:",
    "\u{1F48E}": ":gem:",
    "\u{1F507}": ":mute:",
    "\u{1F508}": ":speaker:",
    "\u{1F509}": ":sound:",
    "\u{1F50A}": ":loud_sound:",
    "\u{1F4E2}": ":loudspeaker:",
    "\u{1F4E3}": ":mega:",
    "\u{1F4EF}": ":postal_horn:",
    "\u{1F514}": ":bell:",
    "\u{1F515}": ":no_bell:",
    "\u{1F3BC}": ":musical_score:",
    "\u{1F3B5}": ":musical_note:",
    "\u{1F3B6}": ":notes:",
    "\u{1F399}\uFE0F": ":studio_microphone:",
    "\u{1F39A}\uFE0F": ":level_slider:",
    "\u{1F39B}\uFE0F": ":control_knobs:",
    "\u{1F3A4}": ":microphone:",
    "\u{1F3A7}": ":headphones:",
    "\u{1F4FB}": ":radio:",
    "\u{1F3B7}": ":saxophone:",
    "\u{1FA97}": ":accordion:",
    "\u{1F3B8}": ":guitar:",
    "\u{1F3B9}": ":musical_keyboard:",
    "\u{1F3BA}": ":trumpet:",
    "\u{1F3BB}": ":violin:",
    "\u{1FA95}": ":banjo:",
    "\u{1F941}": ":drum:",
    "\u{1FA98}": ":long_drum:",
    "\u{1FA87}": ":maracas:",
    "\u{1FA88}": ":flute:",
    "\u{1F4F1}": ":iphone:",
    "\u{1F4F2}": ":calling:",
    "\u260E\uFE0F": ":phone:",
    "\u{1F4DE}": ":telephone_receiver:",
    "\u{1F4DF}": ":pager:",
    "\u{1F4E0}": ":fax:",
    "\u{1F50B}": ":battery:",
    "\u{1FAAB}": ":low_battery:",
    "\u{1F50C}": ":electric_plug:",
    "\u{1F4BB}": ":computer:",
    "\u{1F5A5}\uFE0F": ":desktop_computer:",
    "\u{1F5A8}\uFE0F": ":printer:",
    "\u2328\uFE0F": ":keyboard:",
    "\u{1F5B1}\uFE0F": ":computer_mouse:",
    "\u{1F5B2}\uFE0F": ":trackball:",
    "\u{1F4BD}": ":minidisc:",
    "\u{1F4BE}": ":floppy_disk:",
    "\u{1F4BF}": ":cd:",
    "\u{1F4C0}": ":dvd:",
    "\u{1F9EE}": ":abacus:",
    "\u{1F3A5}": ":movie_camera:",
    "\u{1F39E}\uFE0F": ":film_strip:",
    "\u{1F4FD}\uFE0F": ":film_projector:",
    "\u{1F3AC}": ":clapper:",
    "\u{1F4FA}": ":tv:",
    "\u{1F4F7}": ":camera:",
    "\u{1F4F8}": ":camera_flash:",
    "\u{1F4F9}": ":video_camera:",
    "\u{1F4FC}": ":vhs:",
    "\u{1F50D}": ":mag:",
    "\u{1F50E}": ":mag_right:",
    "\u{1F56F}\uFE0F": ":candle:",
    "\u{1F4A1}": ":bulb:",
    "\u{1F526}": ":flashlight:",
    "\u{1F3EE}": ":izakaya_lantern:",
    "\u{1FA94}": ":diya_lamp:",
    "\u{1F4D4}": ":notebook_with_decorative_cover:",
    "\u{1F4D5}": ":closed_book:",
    "\u{1F4D6}": ":book:",
    "\u{1F4D7}": ":green_book:",
    "\u{1F4D8}": ":blue_book:",
    "\u{1F4D9}": ":orange_book:",
    "\u{1F4DA}": ":books:",
    "\u{1F4D3}": ":notebook:",
    "\u{1F4D2}": ":ledger:",
    "\u{1F4C3}": ":page_with_curl:",
    "\u{1F4DC}": ":scroll:",
    "\u{1F4C4}": ":page_facing_up:",
    "\u{1F4F0}": ":newspaper:",
    "\u{1F5DE}\uFE0F": ":newspaper_roll:",
    "\u{1F4D1}": ":bookmark_tabs:",
    "\u{1F516}": ":bookmark:",
    "\u{1F3F7}\uFE0F": ":label:",
    "\u{1F4B0}": ":moneybag:",
    "\u{1FA99}": ":coin:",
    "\u{1F4B4}": ":yen:",
    "\u{1F4B5}": ":dollar:",
    "\u{1F4B6}": ":euro:",
    "\u{1F4B7}": ":pound:",
    "\u{1F4B8}": ":money_with_wings:",
    "\u{1F4B3}": ":credit_card:",
    "\u{1F9FE}": ":receipt:",
    "\u{1F4B9}": ":chart:",
    "\u2709\uFE0F": ":envelope:",
    "\u{1F4E7}": ":email:",
    "\u{1F4E8}": ":incoming_envelope:",
    "\u{1F4E9}": ":envelope_with_arrow:",
    "\u{1F4E4}": ":outbox_tray:",
    "\u{1F4E5}": ":inbox_tray:",
    "\u{1F4E6}": ":package:",
    "\u{1F4EB}": ":mailbox:",
    "\u{1F4EA}": ":mailbox_closed:",
    "\u{1F4EC}": ":mailbox_with_mail:",
    "\u{1F4ED}": ":mailbox_with_no_mail:",
    "\u{1F4EE}": ":postbox:",
    "\u{1F5F3}\uFE0F": ":ballot_box:",
    "\u270F\uFE0F": ":pencil2:",
    "\u2712\uFE0F": ":black_nib:",
    "\u{1F58B}\uFE0F": ":fountain_pen:",
    "\u{1F58A}\uFE0F": ":pen:",
    "\u{1F58C}\uFE0F": ":paintbrush:",
    "\u{1F58D}\uFE0F": ":crayon:",
    "\u{1F4DD}": ":memo:",
    "\u{1F4BC}": ":briefcase:",
    "\u{1F4C1}": ":file_folder:",
    "\u{1F4C2}": ":open_file_folder:",
    "\u{1F5C2}\uFE0F": ":card_index_dividers:",
    "\u{1F4C5}": ":date:",
    "\u{1F4C6}": ":calendar:",
    "\u{1F5D2}\uFE0F": ":spiral_notepad:",
    "\u{1F5D3}\uFE0F": ":spiral_calendar:",
    "\u{1F4C7}": ":card_index:",
    "\u{1F4C8}": ":chart_with_upwards_trend:",
    "\u{1F4C9}": ":chart_with_downwards_trend:",
    "\u{1F4CA}": ":bar_chart:",
    "\u{1F4CB}": ":clipboard:",
    "\u{1F4CC}": ":pushpin:",
    "\u{1F4CD}": ":round_pushpin:",
    "\u{1F4CE}": ":paperclip:",
    "\u{1F587}\uFE0F": ":paperclips:",
    "\u{1F4CF}": ":straight_ruler:",
    "\u{1F4D0}": ":triangular_ruler:",
    "\u2702\uFE0F": ":scissors:",
    "\u{1F5C3}\uFE0F": ":card_file_box:",
    "\u{1F5C4}\uFE0F": ":file_cabinet:",
    "\u{1F5D1}\uFE0F": ":wastebasket:",
    "\u{1F512}": ":lock:",
    "\u{1F513}": ":unlock:",
    "\u{1F50F}": ":lock_with_ink_pen:",
    "\u{1F510}": ":closed_lock_with_key:",
    "\u{1F511}": ":key:",
    "\u{1F5DD}\uFE0F": ":old_key:",
    "\u{1F528}": ":hammer:",
    "\u{1FA93}": ":axe:",
    "\u26CF\uFE0F": ":pick:",
    "\u2692\uFE0F": ":hammer_and_pick:",
    "\u{1F6E0}\uFE0F": ":hammer_and_wrench:",
    "\u{1F5E1}\uFE0F": ":dagger:",
    "\u2694\uFE0F": ":crossed_swords:",
    "\u{1F4A3}": ":bomb:",
    "\u{1FA83}": ":boomerang:",
    "\u{1F3F9}": ":bow_and_arrow:",
    "\u{1F6E1}\uFE0F": ":shield:",
    "\u{1FA9A}": ":carpentry_saw:",
    "\u{1F527}": ":wrench:",
    "\u{1FA9B}": ":screwdriver:",
    "\u{1F529}": ":nut_and_bolt:",
    "\u2699\uFE0F": ":gear:",
    "\u{1F5DC}\uFE0F": ":clamp:",
    "\u2696\uFE0F": ":balance_scale:",
    "\u{1F9AF}": ":probing_cane:",
    "\u{1F517}": ":link:",
    "\u26D3\uFE0F": ":chains:",
    "\u{1FA9D}": ":hook:",
    "\u{1F9F0}": ":toolbox:",
    "\u{1F9F2}": ":magnet:",
    "\u{1FA9C}": ":ladder:",
    "\u2697\uFE0F": ":alembic:",
    "\u{1F9EA}": ":test_tube:",
    "\u{1F9EB}": ":petri_dish:",
    "\u{1F9EC}": ":dna:",
    "\u{1F52C}": ":microscope:",
    "\u{1F52D}": ":telescope:",
    "\u{1F4E1}": ":satellite:",
    "\u{1F489}": ":syringe:",
    "\u{1FA78}": ":drop_of_blood:",
    "\u{1F48A}": ":pill:",
    "\u{1FA79}": ":adhesive_bandage:",
    "\u{1FA7C}": ":crutch:",
    "\u{1FA7A}": ":stethoscope:",
    "\u{1FA7B}": ":x_ray:",
    "\u{1F6AA}": ":door:",
    "\u{1F6D7}": ":elevator:",
    "\u{1FA9E}": ":mirror:",
    "\u{1FA9F}": ":window:",
    "\u{1F6CF}\uFE0F": ":bed:",
    "\u{1F6CB}\uFE0F": ":couch_and_lamp:",
    "\u{1FA91}": ":chair:",
    "\u{1F6BD}": ":toilet:",
    "\u{1FAA0}": ":plunger:",
    "\u{1F6BF}": ":shower:",
    "\u{1F6C1}": ":bathtub:",
    "\u{1FAA4}": ":mouse_trap:",
    "\u{1FA92}": ":razor:",
    "\u{1F9F4}": ":lotion_bottle:",
    "\u{1F9F7}": ":safety_pin:",
    "\u{1F9F9}": ":broom:",
    "\u{1F9FA}": ":basket:",
    "\u{1F9FB}": ":roll_of_paper:",
    "\u{1FAA3}": ":bucket:",
    "\u{1F9FC}": ":soap:",
    "\u{1FAE7}": ":bubbles:",
    "\u{1FAA5}": ":toothbrush:",
    "\u{1F9FD}": ":sponge:",
    "\u{1F9EF}": ":fire_extinguisher:",
    "\u{1F6D2}": ":shopping_cart:",
    "\u{1F6AC}": ":smoking:",
    "\u26B0\uFE0F": ":coffin:",
    "\u{1FAA6}": ":headstone:",
    "\u26B1\uFE0F": ":funeral_urn:",
    "\u{1F9FF}": ":nazar_amulet:",
    "\u{1FAAC}": ":hamsa:",
    "\u{1F5FF}": ":moyai:",
    "\u{1FAA7}": ":placard:",
    "\u{1FAAA}": ":identification_card:",
    "\u{1F3E7}": ":atm:",
    "\u{1F6AE}": ":put_litter_in_its_place:",
    "\u{1F6B0}": ":potable_water:",
    "\u267F": ":wheelchair:",
    "\u{1F6B9}": ":mens:",
    "\u{1F6BA}": ":womens:",
    "\u{1F6BB}": ":restroom:",
    "\u{1F6BC}": ":baby_symbol:",
    "\u{1F6BE}": ":wc:",
    "\u{1F6C2}": ":passport_control:",
    "\u{1F6C3}": ":customs:",
    "\u{1F6C4}": ":baggage_claim:",
    "\u{1F6C5}": ":left_luggage:",
    "\u26A0\uFE0F": ":warning:",
    "\u{1F6B8}": ":children_crossing:",
    "\u26D4": ":no_entry:",
    "\u{1F6AB}": ":no_entry_sign:",
    "\u{1F6B3}": ":no_bicycles:",
    "\u{1F6AD}": ":no_smoking:",
    "\u{1F6AF}": ":do_not_litter:",
    "\u{1F6B1}": ":non-potable_water:",
    "\u{1F6B7}": ":no_pedestrians:",
    "\u{1F4F5}": ":no_mobile_phones:",
    "\u{1F51E}": ":underage:",
    "\u2622\uFE0F": ":radioactive:",
    "\u2623\uFE0F": ":biohazard:",
    "\u2B06\uFE0F": ":arrow_up:",
    "\u2197\uFE0F": ":arrow_upper_right:",
    "\u27A1\uFE0F": ":arrow_right:",
    "\u2198\uFE0F": ":arrow_lower_right:",
    "\u2B07\uFE0F": ":arrow_down:",
    "\u2199\uFE0F": ":arrow_lower_left:",
    "\u2B05\uFE0F": ":arrow_left:",
    "\u2196\uFE0F": ":arrow_upper_left:",
    "\u2195\uFE0F": ":arrow_up_down:",
    "\u2194\uFE0F": ":left_right_arrow:",
    "\u21A9\uFE0F": ":leftwards_arrow_with_hook:",
    "\u21AA\uFE0F": ":arrow_right_hook:",
    "\u2934\uFE0F": ":arrow_heading_up:",
    "\u2935\uFE0F": ":arrow_heading_down:",
    "\u{1F503}": ":arrows_clockwise:",
    "\u{1F504}": ":arrows_counterclockwise:",
    "\u{1F519}": ":back:",
    "\u{1F51A}": ":end:",
    "\u{1F51B}": ":on:",
    "\u{1F51C}": ":soon:",
    "\u{1F51D}": ":top:",
    "\u{1F6D0}": ":place_of_worship:",
    "\u269B\uFE0F": ":atom_symbol:",
    "\u{1F549}\uFE0F": ":om:",
    "\u2721\uFE0F": ":star_of_david:",
    "\u2638\uFE0F": ":wheel_of_dharma:",
    "\u262F\uFE0F": ":yin_yang:",
    "\u271D\uFE0F": ":latin_cross:",
    "\u2626\uFE0F": ":orthodox_cross:",
    "\u262A\uFE0F": ":star_and_crescent:",
    "\u262E\uFE0F": ":peace_symbol:",
    "\u{1F54E}": ":menorah:",
    "\u{1F52F}": ":six_pointed_star:",
    "\u{1FAAF}": ":khanda:",
    "\u2648": ":aries:",
    "\u2649": ":taurus:",
    "\u264A": ":gemini:",
    "\u264B": ":cancer:",
    "\u264C": ":leo:",
    "\u264D": ":virgo:",
    "\u264E": ":libra:",
    "\u264F": ":scorpius:",
    "\u2650": ":sagittarius:",
    "\u2651": ":capricorn:",
    "\u2652": ":aquarius:",
    "\u2653": ":pisces:",
    "\u26CE": ":ophiuchus:",
    "\u{1F500}": ":twisted_rightwards_arrows:",
    "\u{1F501}": ":repeat:",
    "\u{1F502}": ":repeat_one:",
    "\u25B6\uFE0F": ":arrow_forward:",
    "\u23E9": ":fast_forward:",
    "\u23ED\uFE0F": ":next_track_button:",
    "\u23EF\uFE0F": ":play_or_pause_button:",
    "\u25C0\uFE0F": ":arrow_backward:",
    "\u23EA": ":rewind:",
    "\u23EE\uFE0F": ":previous_track_button:",
    "\u{1F53C}": ":arrow_up_small:",
    "\u23EB": ":arrow_double_up:",
    "\u{1F53D}": ":arrow_down_small:",
    "\u23EC": ":arrow_double_down:",
    "\u23F8\uFE0F": ":pause_button:",
    "\u23F9\uFE0F": ":stop_button:",
    "\u23FA\uFE0F": ":record_button:",
    "\u23CF\uFE0F": ":eject_button:",
    "\u{1F3A6}": ":cinema:",
    "\u{1F505}": ":low_brightness:",
    "\u{1F506}": ":high_brightness:",
    "\u{1F4F6}": ":signal_strength:",
    "\u{1F6DC}": ":wireless:",
    "\u{1F4F3}": ":vibration_mode:",
    "\u{1F4F4}": ":mobile_phone_off:",
    "\u2640\uFE0F": ":female_sign:",
    "\u2642\uFE0F": ":male_sign:",
    "\u26A7\uFE0F": ":transgender_symbol:",
    "\u2716\uFE0F": ":heavy_multiplication_x:",
    "\u2795": ":heavy_plus_sign:",
    "\u2796": ":heavy_minus_sign:",
    "\u2797": ":heavy_division_sign:",
    "\u{1F7F0}": ":heavy_equals_sign:",
    "\u267E\uFE0F": ":infinity:",
    "\u203C\uFE0F": ":bangbang:",
    "\u2049\uFE0F": ":interrobang:",
    "\u2753": ":question:",
    "\u2754": ":grey_question:",
    "\u2755": ":grey_exclamation:",
    "\u2757": ":exclamation:",
    "\u3030\uFE0F": ":wavy_dash:",
    "\u{1F4B1}": ":currency_exchange:",
    "\u{1F4B2}": ":heavy_dollar_sign:",
    "\u2695\uFE0F": ":medical_symbol:",
    "\u267B\uFE0F": ":recycle:",
    "\u269C\uFE0F": ":fleur_de_lis:",
    "\u{1F531}": ":trident:",
    "\u{1F4DB}": ":name_badge:",
    "\u{1F530}": ":beginner:",
    "\u2B55": ":o:",
    "\u2705": ":white_check_mark:",
    "\u2611\uFE0F": ":ballot_box_with_check:",
    "\u2714\uFE0F": ":heavy_check_mark:",
    "\u274C": ":x:",
    "\u274E": ":negative_squared_cross_mark:",
    "\u27B0": ":curly_loop:",
    "\u27BF": ":loop:",
    "\u303D\uFE0F": ":part_alternation_mark:",
    "\u2733\uFE0F": ":eight_spoked_asterisk:",
    "\u2734\uFE0F": ":eight_pointed_black_star:",
    "\u2747\uFE0F": ":sparkle:",
    "\xA9\uFE0F": ":copyright:",
    "\xAE\uFE0F": ":registered:",
    "\u2122\uFE0F": ":tm:",
    "#\uFE0F\u20E3": ":hash:",
    "*\uFE0F\u20E3": ":asterisk:",
    "0\uFE0F\u20E3": ":zero:",
    "1\uFE0F\u20E3": ":one:",
    "2\uFE0F\u20E3": ":two:",
    "3\uFE0F\u20E3": ":three:",
    "4\uFE0F\u20E3": ":four:",
    "5\uFE0F\u20E3": ":five:",
    "6\uFE0F\u20E3": ":six:",
    "7\uFE0F\u20E3": ":seven:",
    "8\uFE0F\u20E3": ":eight:",
    "9\uFE0F\u20E3": ":nine:",
    "\u{1F51F}": ":keycap_ten:",
    "\u{1F520}": ":capital_abcd:",
    "\u{1F521}": ":abcd:",
    "\u{1F522}": ":1234:",
    "\u{1F523}": ":symbols:",
    "\u{1F524}": ":abc:",
    "\u{1F170}\uFE0F": ":a:",
    "\u{1F18E}": ":ab:",
    "\u{1F171}\uFE0F": ":b:",
    "\u{1F191}": ":cl:",
    "\u{1F192}": ":cool:",
    "\u{1F193}": ":free:",
    "\u2139\uFE0F": ":information_source:",
    "\u{1F194}": ":id:",
    "\u24C2\uFE0F": ":m:",
    "\u{1F195}": ":new:",
    "\u{1F196}": ":ng:",
    "\u{1F17E}\uFE0F": ":o2:",
    "\u{1F197}": ":ok:",
    "\u{1F17F}\uFE0F": ":parking:",
    "\u{1F198}": ":sos:",
    "\u{1F199}": ":up:",
    "\u{1F19A}": ":vs:",
    "\u{1F201}": ":koko:",
    "\u{1F202}\uFE0F": ":sa:",
    "\u{1F237}\uFE0F": ":u6708:",
    "\u{1F236}": ":u6709:",
    "\u{1F22F}": ":u6307:",
    "\u{1F250}": ":ideograph_advantage:",
    "\u{1F239}": ":u5272:",
    "\u{1F21A}": ":u7121:",
    "\u{1F232}": ":u7981:",
    "\u{1F251}": ":accept:",
    "\u{1F238}": ":u7533:",
    "\u{1F234}": ":u5408:",
    "\u{1F233}": ":u7a7a:",
    "\u3297\uFE0F": ":congratulations:",
    "\u3299\uFE0F": ":secret:",
    "\u{1F23A}": ":u55b6:",
    "\u{1F235}": ":u6e80:",
    "\u{1F534}": ":red_circle:",
    "\u{1F7E0}": ":orange_circle:",
    "\u{1F7E1}": ":yellow_circle:",
    "\u{1F7E2}": ":green_circle:",
    "\u{1F535}": ":large_blue_circle:",
    "\u{1F7E3}": ":purple_circle:",
    "\u{1F7E4}": ":brown_circle:",
    "\u26AB": ":black_circle:",
    "\u26AA": ":white_circle:",
    "\u{1F7E5}": ":red_square:",
    "\u{1F7E7}": ":orange_square:",
    "\u{1F7E8}": ":yellow_square:",
    "\u{1F7E9}": ":green_square:",
    "\u{1F7E6}": ":blue_square:",
    "\u{1F7EA}": ":purple_square:",
    "\u{1F7EB}": ":brown_square:",
    "\u2B1B": ":black_large_square:",
    "\u2B1C": ":white_large_square:",
    "\u25FC\uFE0F": ":black_medium_square:",
    "\u25FB\uFE0F": ":white_medium_square:",
    "\u25FE": ":black_medium_small_square:",
    "\u25FD": ":white_medium_small_square:",
    "\u25AA\uFE0F": ":black_small_square:",
    "\u25AB\uFE0F": ":white_small_square:",
    "\u{1F536}": ":large_orange_diamond:",
    "\u{1F537}": ":large_blue_diamond:",
    "\u{1F538}": ":small_orange_diamond:",
    "\u{1F539}": ":small_blue_diamond:",
    "\u{1F53A}": ":small_red_triangle:",
    "\u{1F53B}": ":small_red_triangle_down:",
    "\u{1F4A0}": ":diamond_shape_with_a_dot_inside:",
    "\u{1F518}": ":radio_button:",
    "\u{1F533}": ":white_square_button:",
    "\u{1F532}": ":black_square_button:",
    "\u{1F3C1}": ":checkered_flag:",
    "\u{1F6A9}": ":triangular_flag_on_post:",
    "\u{1F38C}": ":crossed_flags:",
    "\u{1F3F4}": ":black_flag:",
    "\u{1F3F3}\uFE0F": ":white_flag:",
    "\u{1F3F3}\uFE0F\u200D\u{1F308}": ":rainbow_flag:",
    "\u{1F3F3}\uFE0F\u200D\u26A7\uFE0F": ":transgender_flag:",
    "\u{1F3F4}\u200D\u2620\uFE0F": ":pirate_flag:",
    "\u{1F1E6}\u{1F1E8}": ":ascension_island:",
    "\u{1F1E6}\u{1F1E9}": ":andorra:",
    "\u{1F1E6}\u{1F1EA}": ":united_arab_emirates:",
    "\u{1F1E6}\u{1F1EB}": ":afghanistan:",
    "\u{1F1E6}\u{1F1EC}": ":antigua_barbuda:",
    "\u{1F1E6}\u{1F1EE}": ":anguilla:",
    "\u{1F1E6}\u{1F1F1}": ":albania:",
    "\u{1F1E6}\u{1F1F2}": ":armenia:",
    "\u{1F1E6}\u{1F1F4}": ":angola:",
    "\u{1F1E6}\u{1F1F6}": ":antarctica:",
    "\u{1F1E6}\u{1F1F7}": ":argentina:",
    "\u{1F1E6}\u{1F1F8}": ":american_samoa:",
    "\u{1F1E6}\u{1F1F9}": ":austria:",
    "\u{1F1E6}\u{1F1FA}": ":australia:",
    "\u{1F1E6}\u{1F1FC}": ":aruba:",
    "\u{1F1E6}\u{1F1FD}": ":aland_islands:",
    "\u{1F1E6}\u{1F1FF}": ":azerbaijan:",
    "\u{1F1E7}\u{1F1E6}": ":bosnia_herzegovina:",
    "\u{1F1E7}\u{1F1E7}": ":barbados:",
    "\u{1F1E7}\u{1F1E9}": ":bangladesh:",
    "\u{1F1E7}\u{1F1EA}": ":belgium:",
    "\u{1F1E7}\u{1F1EB}": ":burkina_faso:",
    "\u{1F1E7}\u{1F1EC}": ":bulgaria:",
    "\u{1F1E7}\u{1F1ED}": ":bahrain:",
    "\u{1F1E7}\u{1F1EE}": ":burundi:",
    "\u{1F1E7}\u{1F1EF}": ":benin:",
    "\u{1F1E7}\u{1F1F1}": ":st_barthelemy:",
    "\u{1F1E7}\u{1F1F2}": ":bermuda:",
    "\u{1F1E7}\u{1F1F3}": ":brunei:",
    "\u{1F1E7}\u{1F1F4}": ":bolivia:",
    "\u{1F1E7}\u{1F1F6}": ":caribbean_netherlands:",
    "\u{1F1E7}\u{1F1F7}": ":brazil:",
    "\u{1F1E7}\u{1F1F8}": ":bahamas:",
    "\u{1F1E7}\u{1F1F9}": ":bhutan:",
    "\u{1F1E7}\u{1F1FB}": ":bouvet_island:",
    "\u{1F1E7}\u{1F1FC}": ":botswana:",
    "\u{1F1E7}\u{1F1FE}": ":belarus:",
    "\u{1F1E7}\u{1F1FF}": ":belize:",
    "\u{1F1E8}\u{1F1E6}": ":canada:",
    "\u{1F1E8}\u{1F1E8}": ":cocos_islands:",
    "\u{1F1E8}\u{1F1E9}": ":congo_kinshasa:",
    "\u{1F1E8}\u{1F1EB}": ":central_african_republic:",
    "\u{1F1E8}\u{1F1EC}": ":congo_brazzaville:",
    "\u{1F1E8}\u{1F1ED}": ":switzerland:",
    "\u{1F1E8}\u{1F1EE}": ":cote_divoire:",
    "\u{1F1E8}\u{1F1F0}": ":cook_islands:",
    "\u{1F1E8}\u{1F1F1}": ":chile:",
    "\u{1F1E8}\u{1F1F2}": ":cameroon:",
    "\u{1F1E8}\u{1F1F3}": ":cn:",
    "\u{1F1E8}\u{1F1F4}": ":colombia:",
    "\u{1F1E8}\u{1F1F5}": ":clipperton_island:",
    "\u{1F1E8}\u{1F1F7}": ":costa_rica:",
    "\u{1F1E8}\u{1F1FA}": ":cuba:",
    "\u{1F1E8}\u{1F1FB}": ":cape_verde:",
    "\u{1F1E8}\u{1F1FC}": ":curacao:",
    "\u{1F1E8}\u{1F1FD}": ":christmas_island:",
    "\u{1F1E8}\u{1F1FE}": ":cyprus:",
    "\u{1F1E8}\u{1F1FF}": ":czech_republic:",
    "\u{1F1E9}\u{1F1EA}": ":de:",
    "\u{1F1E9}\u{1F1EC}": ":diego_garcia:",
    "\u{1F1E9}\u{1F1EF}": ":djibouti:",
    "\u{1F1E9}\u{1F1F0}": ":denmark:",
    "\u{1F1E9}\u{1F1F2}": ":dominica:",
    "\u{1F1E9}\u{1F1F4}": ":dominican_republic:",
    "\u{1F1E9}\u{1F1FF}": ":algeria:",
    "\u{1F1EA}\u{1F1E6}": ":ceuta_melilla:",
    "\u{1F1EA}\u{1F1E8}": ":ecuador:",
    "\u{1F1EA}\u{1F1EA}": ":estonia:",
    "\u{1F1EA}\u{1F1EC}": ":egypt:",
    "\u{1F1EA}\u{1F1ED}": ":western_sahara:",
    "\u{1F1EA}\u{1F1F7}": ":eritrea:",
    "\u{1F1EA}\u{1F1F8}": ":es:",
    "\u{1F1EA}\u{1F1F9}": ":ethiopia:",
    "\u{1F1EA}\u{1F1FA}": ":eu:",
    "\u{1F1EB}\u{1F1EE}": ":finland:",
    "\u{1F1EB}\u{1F1EF}": ":fiji:",
    "\u{1F1EB}\u{1F1F0}": ":falkland_islands:",
    "\u{1F1EB}\u{1F1F2}": ":micronesia:",
    "\u{1F1EB}\u{1F1F4}": ":faroe_islands:",
    "\u{1F1EB}\u{1F1F7}": ":fr:",
    "\u{1F1EC}\u{1F1E6}": ":gabon:",
    "\u{1F1EC}\u{1F1E7}": ":gb:",
    "\u{1F1EC}\u{1F1E9}": ":grenada:",
    "\u{1F1EC}\u{1F1EA}": ":georgia:",
    "\u{1F1EC}\u{1F1EB}": ":french_guiana:",
    "\u{1F1EC}\u{1F1EC}": ":guernsey:",
    "\u{1F1EC}\u{1F1ED}": ":ghana:",
    "\u{1F1EC}\u{1F1EE}": ":gibraltar:",
    "\u{1F1EC}\u{1F1F1}": ":greenland:",
    "\u{1F1EC}\u{1F1F2}": ":gambia:",
    "\u{1F1EC}\u{1F1F3}": ":guinea:",
    "\u{1F1EC}\u{1F1F5}": ":guadeloupe:",
    "\u{1F1EC}\u{1F1F6}": ":equatorial_guinea:",
    "\u{1F1EC}\u{1F1F7}": ":greece:",
    "\u{1F1EC}\u{1F1F8}": ":south_georgia_south_sandwich_islands:",
    "\u{1F1EC}\u{1F1F9}": ":guatemala:",
    "\u{1F1EC}\u{1F1FA}": ":guam:",
    "\u{1F1EC}\u{1F1FC}": ":guinea_bissau:",
    "\u{1F1EC}\u{1F1FE}": ":guyana:",
    "\u{1F1ED}\u{1F1F0}": ":hong_kong:",
    "\u{1F1ED}\u{1F1F2}": ":heard_mcdonald_islands:",
    "\u{1F1ED}\u{1F1F3}": ":honduras:",
    "\u{1F1ED}\u{1F1F7}": ":croatia:",
    "\u{1F1ED}\u{1F1F9}": ":haiti:",
    "\u{1F1ED}\u{1F1FA}": ":hungary:",
    "\u{1F1EE}\u{1F1E8}": ":canary_islands:",
    "\u{1F1EE}\u{1F1E9}": ":indonesia:",
    "\u{1F1EE}\u{1F1EA}": ":ireland:",
    "\u{1F1EE}\u{1F1F1}": ":israel:",
    "\u{1F1EE}\u{1F1F2}": ":isle_of_man:",
    "\u{1F1EE}\u{1F1F3}": ":india:",
    "\u{1F1EE}\u{1F1F4}": ":british_indian_ocean_territory:",
    "\u{1F1EE}\u{1F1F6}": ":iraq:",
    "\u{1F1EE}\u{1F1F7}": ":iran:",
    "\u{1F1EE}\u{1F1F8}": ":iceland:",
    "\u{1F1EE}\u{1F1F9}": ":it:",
    "\u{1F1EF}\u{1F1EA}": ":jersey:",
    "\u{1F1EF}\u{1F1F2}": ":jamaica:",
    "\u{1F1EF}\u{1F1F4}": ":jordan:",
    "\u{1F1EF}\u{1F1F5}": ":jp:",
    "\u{1F1F0}\u{1F1EA}": ":kenya:",
    "\u{1F1F0}\u{1F1EC}": ":kyrgyzstan:",
    "\u{1F1F0}\u{1F1ED}": ":cambodia:",
    "\u{1F1F0}\u{1F1EE}": ":kiribati:",
    "\u{1F1F0}\u{1F1F2}": ":comoros:",
    "\u{1F1F0}\u{1F1F3}": ":st_kitts_nevis:",
    "\u{1F1F0}\u{1F1F5}": ":north_korea:",
    "\u{1F1F0}\u{1F1F7}": ":kr:",
    "\u{1F1F0}\u{1F1FC}": ":kuwait:",
    "\u{1F1F0}\u{1F1FE}": ":cayman_islands:",
    "\u{1F1F0}\u{1F1FF}": ":kazakhstan:",
    "\u{1F1F1}\u{1F1E6}": ":laos:",
    "\u{1F1F1}\u{1F1E7}": ":lebanon:",
    "\u{1F1F1}\u{1F1E8}": ":st_lucia:",
    "\u{1F1F1}\u{1F1EE}": ":liechtenstein:",
    "\u{1F1F1}\u{1F1F0}": ":sri_lanka:",
    "\u{1F1F1}\u{1F1F7}": ":liberia:",
    "\u{1F1F1}\u{1F1F8}": ":lesotho:",
    "\u{1F1F1}\u{1F1F9}": ":lithuania:",
    "\u{1F1F1}\u{1F1FA}": ":luxembourg:",
    "\u{1F1F1}\u{1F1FB}": ":latvia:",
    "\u{1F1F1}\u{1F1FE}": ":libya:",
    "\u{1F1F2}\u{1F1E6}": ":morocco:",
    "\u{1F1F2}\u{1F1E8}": ":monaco:",
    "\u{1F1F2}\u{1F1E9}": ":moldova:",
    "\u{1F1F2}\u{1F1EA}": ":montenegro:",
    "\u{1F1F2}\u{1F1EB}": ":st_martin:",
    "\u{1F1F2}\u{1F1EC}": ":madagascar:",
    "\u{1F1F2}\u{1F1ED}": ":marshall_islands:",
    "\u{1F1F2}\u{1F1F0}": ":macedonia:",
    "\u{1F1F2}\u{1F1F1}": ":mali:",
    "\u{1F1F2}\u{1F1F2}": ":myanmar:",
    "\u{1F1F2}\u{1F1F3}": ":mongolia:",
    "\u{1F1F2}\u{1F1F4}": ":macau:",
    "\u{1F1F2}\u{1F1F5}": ":northern_mariana_islands:",
    "\u{1F1F2}\u{1F1F6}": ":martinique:",
    "\u{1F1F2}\u{1F1F7}": ":mauritania:",
    "\u{1F1F2}\u{1F1F8}": ":montserrat:",
    "\u{1F1F2}\u{1F1F9}": ":malta:",
    "\u{1F1F2}\u{1F1FA}": ":mauritius:",
    "\u{1F1F2}\u{1F1FB}": ":maldives:",
    "\u{1F1F2}\u{1F1FC}": ":malawi:",
    "\u{1F1F2}\u{1F1FD}": ":mexico:",
    "\u{1F1F2}\u{1F1FE}": ":malaysia:",
    "\u{1F1F2}\u{1F1FF}": ":mozambique:",
    "\u{1F1F3}\u{1F1E6}": ":namibia:",
    "\u{1F1F3}\u{1F1E8}": ":new_caledonia:",
    "\u{1F1F3}\u{1F1EA}": ":niger:",
    "\u{1F1F3}\u{1F1EB}": ":norfolk_island:",
    "\u{1F1F3}\u{1F1EC}": ":nigeria:",
    "\u{1F1F3}\u{1F1EE}": ":nicaragua:",
    "\u{1F1F3}\u{1F1F1}": ":netherlands:",
    "\u{1F1F3}\u{1F1F4}": ":norway:",
    "\u{1F1F3}\u{1F1F5}": ":nepal:",
    "\u{1F1F3}\u{1F1F7}": ":nauru:",
    "\u{1F1F3}\u{1F1FA}": ":niue:",
    "\u{1F1F3}\u{1F1FF}": ":new_zealand:",
    "\u{1F1F4}\u{1F1F2}": ":oman:",
    "\u{1F1F5}\u{1F1E6}": ":panama:",
    "\u{1F1F5}\u{1F1EA}": ":peru:",
    "\u{1F1F5}\u{1F1EB}": ":french_polynesia:",
    "\u{1F1F5}\u{1F1EC}": ":papua_new_guinea:",
    "\u{1F1F5}\u{1F1ED}": ":philippines:",
    "\u{1F1F5}\u{1F1F0}": ":pakistan:",
    "\u{1F1F5}\u{1F1F1}": ":poland:",
    "\u{1F1F5}\u{1F1F2}": ":st_pierre_miquelon:",
    "\u{1F1F5}\u{1F1F3}": ":pitcairn_islands:",
    "\u{1F1F5}\u{1F1F7}": ":puerto_rico:",
    "\u{1F1F5}\u{1F1F8}": ":palestinian_territories:",
    "\u{1F1F5}\u{1F1F9}": ":portugal:",
    "\u{1F1F5}\u{1F1FC}": ":palau:",
    "\u{1F1F5}\u{1F1FE}": ":paraguay:",
    "\u{1F1F6}\u{1F1E6}": ":qatar:",
    "\u{1F1F7}\u{1F1EA}": ":reunion:",
    "\u{1F1F7}\u{1F1F4}": ":romania:",
    "\u{1F1F7}\u{1F1F8}": ":serbia:",
    "\u{1F1F7}\u{1F1FA}": ":ru:",
    "\u{1F1F7}\u{1F1FC}": ":rwanda:",
    "\u{1F1F8}\u{1F1E6}": ":saudi_arabia:",
    "\u{1F1F8}\u{1F1E7}": ":solomon_islands:",
    "\u{1F1F8}\u{1F1E8}": ":seychelles:",
    "\u{1F1F8}\u{1F1E9}": ":sudan:",
    "\u{1F1F8}\u{1F1EA}": ":sweden:",
    "\u{1F1F8}\u{1F1EC}": ":singapore:",
    "\u{1F1F8}\u{1F1ED}": ":st_helena:",
    "\u{1F1F8}\u{1F1EE}": ":slovenia:",
    "\u{1F1F8}\u{1F1EF}": ":svalbard_jan_mayen:",
    "\u{1F1F8}\u{1F1F0}": ":slovakia:",
    "\u{1F1F8}\u{1F1F1}": ":sierra_leone:",
    "\u{1F1F8}\u{1F1F2}": ":san_marino:",
    "\u{1F1F8}\u{1F1F3}": ":senegal:",
    "\u{1F1F8}\u{1F1F4}": ":somalia:",
    "\u{1F1F8}\u{1F1F7}": ":suriname:",
    "\u{1F1F8}\u{1F1F8}": ":south_sudan:",
    "\u{1F1F8}\u{1F1F9}": ":sao_tome_principe:",
    "\u{1F1F8}\u{1F1FB}": ":el_salvador:",
    "\u{1F1F8}\u{1F1FD}": ":sint_maarten:",
    "\u{1F1F8}\u{1F1FE}": ":syria:",
    "\u{1F1F8}\u{1F1FF}": ":swaziland:",
    "\u{1F1F9}\u{1F1E6}": ":tristan_da_cunha:",
    "\u{1F1F9}\u{1F1E8}": ":turks_caicos_islands:",
    "\u{1F1F9}\u{1F1E9}": ":chad:",
    "\u{1F1F9}\u{1F1EB}": ":french_southern_territories:",
    "\u{1F1F9}\u{1F1EC}": ":togo:",
    "\u{1F1F9}\u{1F1ED}": ":thailand:",
    "\u{1F1F9}\u{1F1EF}": ":tajikistan:",
    "\u{1F1F9}\u{1F1F0}": ":tokelau:",
    "\u{1F1F9}\u{1F1F1}": ":timor_leste:",
    "\u{1F1F9}\u{1F1F2}": ":turkmenistan:",
    "\u{1F1F9}\u{1F1F3}": ":tunisia:",
    "\u{1F1F9}\u{1F1F4}": ":tonga:",
    "\u{1F1F9}\u{1F1F7}": ":tr:",
    "\u{1F1F9}\u{1F1F9}": ":trinidad_tobago:",
    "\u{1F1F9}\u{1F1FB}": ":tuvalu:",
    "\u{1F1F9}\u{1F1FC}": ":taiwan:",
    "\u{1F1F9}\u{1F1FF}": ":tanzania:",
    "\u{1F1FA}\u{1F1E6}": ":ukraine:",
    "\u{1F1FA}\u{1F1EC}": ":uganda:",
    "\u{1F1FA}\u{1F1F2}": ":us_outlying_islands:",
    "\u{1F1FA}\u{1F1F3}": ":united_nations:",
    "\u{1F1FA}\u{1F1F8}": ":us:",
    "\u{1F1FA}\u{1F1FE}": ":uruguay:",
    "\u{1F1FA}\u{1F1FF}": ":uzbekistan:",
    "\u{1F1FB}\u{1F1E6}": ":vatican_city:",
    "\u{1F1FB}\u{1F1E8}": ":st_vincent_grenadines:",
    "\u{1F1FB}\u{1F1EA}": ":venezuela:",
    "\u{1F1FB}\u{1F1EC}": ":british_virgin_islands:",
    "\u{1F1FB}\u{1F1EE}": ":us_virgin_islands:",
    "\u{1F1FB}\u{1F1F3}": ":vietnam:",
    "\u{1F1FB}\u{1F1FA}": ":vanuatu:",
    "\u{1F1FC}\u{1F1EB}": ":wallis_futuna:",
    "\u{1F1FC}\u{1F1F8}": ":samoa:",
    "\u{1F1FD}\u{1F1F0}": ":kosovo:",
    "\u{1F1FE}\u{1F1EA}": ":yemen:",
    "\u{1F1FE}\u{1F1F9}": ":mayotte:",
    "\u{1F1FF}\u{1F1E6}": ":south_africa:",
    "\u{1F1FF}\u{1F1F2}": ":zambia:",
    "\u{1F1FF}\u{1F1FC}": ":zimbabwe:",
    "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}": ":england:",
    "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}": ":scotland:",
    "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}": ":wales:"
  };

  // js/app.ts
  var SUPPORTED_VERSION = 19;
  var DaylioScribe = class {
    constructor() {
      // Data
      this.data = null;
      this.entries = [];
      this.filteredEntries = [];
      this.currentEntryIndex = null;
      this.moods = {};
      this.tags = {};
      this.assetMap = null;
      // Quill editor
      this.quill = null;
      this.isUpdating = false;
      this.hasUnsavedChanges = false;
      this.savedSelection = null;
      // Original entry states for revert (keyed by entry index)
      this.originalEntryStates = /* @__PURE__ */ new Map();
      // Calendar state
      this.calendarDate = /* @__PURE__ */ new Date();
      this.selectedCalendarDate = null;
      // Photo gallery state
      this.currentEntryPhotos = [];
      this.currentPhotoIndex = 0;
      this.lightboxTrigger = null;
      // Virtual scrolling state
      this.itemHeight = 73;
      this.bufferSize = 5;
      this.lastVisibleStart = -1;
      this.lastVisibleEnd = -1;
      this.scrollRAF = null;
      // Default mood labels
      this.defaultMoodLabels = {
        1: "great",
        2: "good",
        3: "meh",
        4: "bad",
        5: "awful"
      };
      // ZIP storage
      this.originalZip = null;
      this.assets = {};
      this.insightsYear = (/* @__PURE__ */ new Date()).getFullYear();
      this.insightsFilteredEntries = [];
      this.handleLightboxKeydown = (e) => {
        if (e.key === "Tab") {
          const focusableEls = this.photoLightbox.querySelectorAll(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          const firstEl = focusableEls[0];
          const lastEl = focusableEls[focusableEls.length - 1];
          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };
      this.initTheme();
      this.initElements();
      this.initQuill();
      this.bindEvents();
      this.initVirtualScroll();
    }
    initTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    }
    toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      let newTheme;
      if (currentTheme === "light") {
        newTheme = "dark";
      } else if (currentTheme === "dark") {
        newTheme = "light";
      } else {
        newTheme = systemPrefersDark ? "light" : "dark";
      }
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
    initElements() {
      this.toastContainer = document.getElementById("toastContainer");
      this.dropzone = document.getElementById("dropzone");
      this.fileInput = document.getElementById("fileInput");
      this.app = document.getElementById("app");
      this.entryCount = document.getElementById("entryCount");
      this.notesCount = document.getElementById("notesCount");
      this.backupVersion = document.getElementById("backupVersion");
      this.filterNotes = document.getElementById("filterNotes");
      this.searchInput = document.getElementById("searchInput");
      this.dateRangeSelect = document.getElementById("dateRangeSelect");
      this.customDateRange = document.getElementById("customDateRange");
      this.dateFrom = document.getElementById("dateFrom");
      this.dateTo = document.getElementById("dateTo");
      this.entriesList = document.getElementById("entriesList");
      this.entriesPanel = this.entriesList.parentElement;
      this.miniCalendar = document.getElementById("miniCalendar");
      this.calendarTitle = document.getElementById("calendarTitle");
      this.calendarGrid = document.getElementById("calendarGrid");
      this.prevMonthBtn = document.getElementById("prevMonth");
      this.nextMonthBtn = document.getElementById("nextMonth");
      this.saveBtn = document.getElementById("saveBtn");
      this.exportBtn = document.getElementById("exportBtn");
      this.exportMenu = document.getElementById("exportMenu");
      this.exportDropdown = this.exportBtn.parentElement;
      this.exportCsvBtn = document.getElementById("exportCsvBtn");
      this.exportJsonBtn = document.getElementById("exportJsonBtn");
      this.exportMarkdownBtn = document.getElementById("exportMarkdownBtn");
      this.exportPdfBtn = document.getElementById("exportPdfBtn");
      this.editorPlaceholder = document.getElementById("editorPlaceholder");
      this.editor = document.getElementById("editor");
      this.editorDate = document.getElementById("editorDate");
      this.editorMood = document.getElementById("editorMood");
      this.activitiesSection = document.getElementById("activitiesSection");
      this.activitiesContainer = document.getElementById("activitiesContainer");
      this.noteTitleInput = document.getElementById("noteTitleInput");
      this.revertBtn = document.getElementById("revertBtn");
      this.photoSection = document.getElementById("photoSection");
      this.photoCount = document.getElementById("photoCount");
      this.photoThumbnails = document.getElementById("photoThumbnails");
      this.photoLightbox = document.getElementById("photoLightbox");
      this.lightboxImage = document.getElementById("lightboxImage");
      this.lightboxCounter = document.getElementById("lightboxCounter");
      this.lightboxClose = document.getElementById("lightboxClose");
      this.lightboxPrev = document.getElementById("lightboxPrev");
      this.lightboxNext = document.getElementById("lightboxNext");
      this.themeToggle = document.getElementById("themeToggle");
      this.insightsBtn = document.getElementById("insightsBtn");
      this.insightsModal = document.getElementById("insightsModal");
      this.insightsClose = document.getElementById("insightsClose");
      this.insightsOverlay = this.insightsModal.querySelector(".insights-overlay");
      this.statTotalEntries = document.getElementById("statTotalEntries");
      this.statCurrentStreak = document.getElementById("statCurrentStreak");
      this.statLongestStreak = document.getElementById("statLongestStreak");
      this.statAvgMood = document.getElementById("statAvgMood");
      this.yearLabel = document.getElementById("yearLabel");
      this.prevYearBtn = document.getElementById("prevYear");
      this.nextYearBtn = document.getElementById("nextYear");
      this.yearPixelsGrid = document.getElementById("yearPixelsGrid");
      this.monthLabels = document.getElementById("monthLabels");
      this.moodBreakdown = document.getElementById("moodBreakdown");
      this.insightsDateRange = document.getElementById("insightsDateRange");
      this.insightsActivity = document.getElementById("insightsActivity");
      this.filterSummary = document.getElementById("filterSummary");
      this.moodTrendsChart = document.getElementById("moodTrendsChart");
      this.topActivities = document.getElementById("topActivities");
      this.entriesPerMonth = document.getElementById("entriesPerMonth");
      this.exportInsightsBtn = document.getElementById("exportInsightsBtn");
    }
    initQuill() {
      this.quill = new Quill("#noteEditor", {
        theme: "snow",
        placeholder: "Write your note here...",
        modules: {
          toolbar: {
            container: [
              ["undo", "redo"],
              ["bold", "italic", "underline", "strike"],
              [{ "list": "ordered" }, { "list": "bullet" }],
              ["emoji"]
            ],
            handlers: {
              "emoji": () => this.toggleEmojiPicker(),
              "undo": () => this.quill.history.undo(),
              "redo": () => this.quill.history.redo()
            }
          },
          keyboard: {
            bindings: {
              bold: {
                key: "B",
                shortKey: true,
                handler: function(_range, context) {
                  this.quill.format("bold", !context.format.bold);
                }
              },
              italic: {
                key: "I",
                shortKey: true,
                handler: function(_range, context) {
                  this.quill.format("italic", !context.format.italic);
                }
              },
              underline: {
                key: "U",
                shortKey: true,
                handler: function(_range, context) {
                  this.quill.format("underline", !context.format.underline);
                }
              }
            }
          }
        }
      });
      this.quill.on("text-change", (_delta, _oldDelta, source) => {
        if (!this.isUpdating && source === "user") {
          this.updateCurrentEntry();
        }
      });
      this.initEmojiPicker();
    }
    initEmojiPicker() {
      this.emojiPickerPopup = document.getElementById("emojiPickerPopup");
      this.emojiPicker = document.querySelector("emoji-picker");
      setTimeout(() => {
        const emojiBtn = document.querySelector(".ql-emoji");
        if (emojiBtn) {
          emojiBtn.setAttribute("aria-label", "Insert emoji");
          emojiBtn.setAttribute("title", "Insert emoji");
        }
        const undoBtn = document.querySelector(".ql-undo");
        if (undoBtn) {
          undoBtn.setAttribute("aria-label", "Undo");
          undoBtn.setAttribute("title", "Undo (Ctrl+Z)");
        }
        const redoBtn = document.querySelector(".ql-redo");
        if (redoBtn) {
          redoBtn.setAttribute("aria-label", "Redo");
          redoBtn.setAttribute("title", "Redo (Ctrl+Shift+Z)");
        }
      }, 100);
      this.emojiPicker.addEventListener("emoji-click", (event) => {
        const emoji = event.detail.unicode;
        this.insertEmoji(emoji);
        this.hideEmojiPicker();
      });
      document.addEventListener("click", (event) => {
        if (!this.emojiPickerPopup.classList.contains("hidden")) {
          const target = event.target;
          const isClickInside = this.emojiPickerPopup.contains(target) || target.closest(".ql-emoji");
          if (!isClickInside) {
            this.hideEmojiPicker();
          }
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !this.emojiPickerPopup.classList.contains("hidden")) {
          this.hideEmojiPicker();
          const emojiBtn = document.querySelector(".ql-emoji");
          emojiBtn?.focus();
        }
      });
    }
    toggleEmojiPicker() {
      if (this.emojiPickerPopup.classList.contains("hidden")) {
        this.showEmojiPicker();
      } else {
        this.hideEmojiPicker();
      }
    }
    showEmojiPicker() {
      const emojiButton = document.querySelector(".ql-emoji");
      const rect = emojiButton.getBoundingClientRect();
      this.emojiPickerPopup.style.top = rect.bottom + 5 + "px";
      this.emojiPickerPopup.style.left = rect.left + "px";
      const pickerWidth = 350;
      if (rect.left + pickerWidth > window.innerWidth) {
        this.emojiPickerPopup.style.left = window.innerWidth - pickerWidth - 10 + "px";
      }
      this.emojiPickerPopup.classList.remove("hidden");
      this.savedSelection = this.quill.getSelection();
    }
    hideEmojiPicker() {
      this.emojiPickerPopup.classList.add("hidden");
    }
    insertEmoji(emoji) {
      const range = this.savedSelection || { index: this.quill.getLength() - 1 };
      this.quill.insertText(range.index, emoji, "user");
      this.quill.setSelection(range.index + emoji.length);
    }
    bindEvents() {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
      this.insightsBtn.addEventListener("click", () => this.openInsights());
      this.insightsClose.addEventListener("click", () => this.closeInsights());
      this.insightsOverlay.addEventListener("click", () => this.closeInsights());
      this.prevYearBtn.addEventListener("click", () => this.changeInsightsYear(-1));
      this.nextYearBtn.addEventListener("click", () => this.changeInsightsYear(1));
      this.insightsModal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.closeInsights();
      });
      this.insightsDateRange.addEventListener("change", () => this.applyInsightsFilters());
      this.insightsActivity.addEventListener("change", () => this.applyInsightsFilters());
      this.exportInsightsBtn.addEventListener("click", () => this.exportInsights());
      this.dropzone.addEventListener("click", () => this.fileInput.click());
      this.fileInput.addEventListener("change", (e) => {
        const target = e.target;
        if (target.files?.[0]) this.handleFile(target.files[0]);
      });
      this.dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        this.dropzone.classList.add("dragover");
      });
      this.dropzone.addEventListener("dragleave", () => {
        this.dropzone.classList.remove("dragover");
      });
      this.dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("dragover");
        const file = e.dataTransfer?.files[0];
        if (file) this.handleFile(file);
      });
      this.filterNotes.addEventListener("change", () => {
        this.renderCalendar();
        this.applyFilters();
      });
      this.searchInput.addEventListener("input", () => this.applyFilters());
      this.saveBtn.addEventListener("click", () => this.saveBackup());
      this.exportBtn.addEventListener("click", () => this.toggleExportMenu());
      this.exportCsvBtn.addEventListener("click", () => {
        this.closeExportMenu();
        this.exportCsv();
      });
      this.exportJsonBtn.addEventListener("click", () => {
        this.closeExportMenu();
        this.exportJson();
      });
      this.exportMarkdownBtn.addEventListener("click", () => {
        this.closeExportMenu();
        this.exportMarkdown();
      });
      this.exportPdfBtn.addEventListener("click", () => {
        this.closeExportMenu();
        this.exportPdf();
      });
      document.addEventListener("click", (e) => {
        if (!this.exportDropdown.contains(e.target)) {
          this.closeExportMenu();
        }
      });
      this.dateRangeSelect.addEventListener("change", () => {
        if (this.dateRangeSelect.value === "custom") {
          this.customDateRange.classList.remove("hidden");
        } else {
          this.customDateRange.classList.add("hidden");
          this.applyFilters();
        }
      });
      this.dateFrom.addEventListener("change", () => this.applyFilters());
      this.dateTo.addEventListener("change", () => this.applyFilters());
      this.prevMonthBtn.addEventListener("click", () => {
        this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
        this.renderCalendar();
      });
      this.nextMonthBtn.addEventListener("click", () => {
        this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
        this.renderCalendar();
      });
      this.lightboxClose.addEventListener("click", () => this.closeLightbox());
      this.lightboxPrev.addEventListener("click", () => this.showPrevPhoto());
      this.lightboxNext.addEventListener("click", () => this.showNextPhoto());
      this.photoLightbox.querySelector(".lightbox-overlay")?.addEventListener("click", () => this.closeLightbox());
      document.addEventListener("keydown", (e) => {
        if (!this.photoLightbox.classList.contains("hidden")) {
          if (e.key === "Escape") this.closeLightbox();
          if (e.key === "ArrowLeft") this.showPrevPhoto();
          if (e.key === "ArrowRight") this.showNextPhoto();
        }
      });
      this.noteTitleInput.addEventListener("input", () => this.updateCurrentEntry());
      this.revertBtn.addEventListener("click", () => this.revertEntry());
      window.addEventListener("beforeunload", (e) => {
        if (this.hasUnsavedChanges) {
          e.preventDefault();
          e.returnValue = "";
          return "";
        }
      });
    }
    async handleFile(file) {
      if (!file || !file.name.endsWith(".daylio")) {
        this.showToast("error", "Invalid File", "Please select a .daylio backup file exported from the Daylio app.");
        return;
      }
      try {
        const dropzoneP = this.dropzone.querySelector("p");
        if (dropzoneP) dropzoneP.textContent = "Loading...";
        this.originalZip = await JSZip.loadAsync(file);
        this.assets = {};
        const assetFiles = Object.keys(this.originalZip.files).filter(
          (name) => name.startsWith("assets/") && !this.originalZip.files[name].dir
        );
        for (const assetPath of assetFiles) {
          this.assets[assetPath] = await this.originalZip.files[assetPath].async("uint8array");
        }
        const backupFile = this.originalZip.file("backup.daylio");
        if (!backupFile) {
          throw new Error("backup.daylio not found in the archive");
        }
        const base64Content = await backupFile.async("string");
        const jsonString = this.base64DecodeUtf8(base64Content.trim());
        this.data = JSON.parse(jsonString);
        this.validateBackupStructure();
        if (!this.checkVersion()) {
          if (dropzoneP) dropzoneP.textContent = "Drop your .daylio backup file here";
          return;
        }
        this.entries = this.data.dayEntries || [];
        this.storeOriginalEntryStates();
        this.buildMoodLabels();
        this.buildTagLabels();
        this.showApp();
      } catch (err) {
        this.showToast("error", "Failed to Load Backup", err.message);
        const dropzoneP = this.dropzone.querySelector("p");
        if (dropzoneP) dropzoneP.textContent = "Drop your .daylio backup file here";
      }
    }
    checkVersion() {
      const backupVersion = this.data?.version;
      if (backupVersion === void 0) {
        console.warn("Backup has no version field - proceeding anyway");
        return true;
      }
      if (backupVersion > SUPPORTED_VERSION) {
        const proceed = confirm(
          `Warning: This backup is from a newer Daylio version (v${backupVersion}).

This app was tested with version ${SUPPORTED_VERSION}.

The backup structure may have changed. Editing could cause data loss or corruption.

Do you want to continue anyway?`
        );
        if (!proceed) {
          return false;
        }
        console.warn(`Proceeding with unsupported backup version ${backupVersion} (supported: ${SUPPORTED_VERSION})`);
      }
      return true;
    }
    validateBackupStructure() {
      if (!this.data || typeof this.data !== "object") {
        throw new Error("Invalid backup: not a valid JSON object");
      }
      if (!Array.isArray(this.data.dayEntries)) {
        throw new Error("Invalid backup: missing or invalid dayEntries array");
      }
      if (!Array.isArray(this.data.customMoods)) {
        throw new Error("Invalid backup: missing or invalid customMoods array");
      }
      for (let i = 0; i < Math.min(this.data.dayEntries.length, 5); i++) {
        const entry = this.data.dayEntries[i];
        if (typeof entry.datetime !== "number") {
          throw new Error(`Invalid backup: entry ${i} missing datetime field`);
        }
        if (typeof entry.mood !== "number") {
          throw new Error(`Invalid backup: entry ${i} missing mood field`);
        }
      }
    }
    buildMoodLabels() {
      this.moods = {};
      const customMoods = this.data?.customMoods || [];
      for (const mood of customMoods) {
        let label = mood.custom_name?.trim();
        if (!label) {
          label = this.defaultMoodLabels[mood.predefined_name_id] || `mood ${mood.id}`;
        }
        this.moods[mood.id] = {
          label,
          groupId: mood.mood_group_id
        };
      }
    }
    buildTagLabels() {
      this.tags = {};
      const tags = this.data?.tags || [];
      for (const tag of tags) {
        this.tags[tag.id] = tag.name;
      }
    }
    getTagName(tagId) {
      return this.tags[tagId] || `activity ${tagId}`;
    }
    getEntryTags(entry) {
      if (!entry.tags || entry.tags.length === 0) return [];
      return entry.tags.map((tagId) => this.getTagName(tagId));
    }
    storeOriginalEntryStates() {
      this.originalEntryStates.clear();
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        this.originalEntryStates.set(i, {
          note: entry.note || "",
          note_title: entry.note_title || ""
        });
      }
    }
    hasAnyChanges() {
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        const original = this.originalEntryStates.get(i);
        if (!original) continue;
        if (entry.note !== original.note || entry.note_title !== original.note_title) {
          return true;
        }
      }
      return false;
    }
    getMoodLabel(moodId) {
      return this.moods[moodId]?.label || `mood ${moodId}`;
    }
    getMoodGroupId(moodId) {
      return this.moods[moodId]?.groupId || moodId;
    }
    showApp() {
      this.dropzone.classList.add("hidden");
      this.app.classList.remove("hidden");
      const withNotes = this.entries.filter((e) => e.note && e.note.length > 0).length;
      this.entryCount.textContent = `${this.entries.length} entries`;
      this.notesCount.textContent = `${withNotes} with notes`;
      const version = this.data?.version;
      if (version !== void 0) {
        this.backupVersion.textContent = `v${version}`;
        if (version > SUPPORTED_VERSION) {
          this.backupVersion.classList.add("version-warning");
          this.backupVersion.dataset.tooltip = `Unsupported version (tested up to v${SUPPORTED_VERSION})`;
        } else {
          this.backupVersion.classList.remove("version-warning");
          this.backupVersion.dataset.tooltip = "Backup format version";
        }
      } else {
        this.backupVersion.textContent = "v?";
        this.backupVersion.dataset.tooltip = "Unknown version";
      }
      this.miniCalendar.classList.add("visible");
      this.renderCalendar();
      this.applyFilters();
    }
    applyFilters() {
      let filtered = [...this.entries];
      if (this.filterNotes.checked) {
        filtered = filtered.filter((e) => e.note && e.note.length > 0);
      }
      const dateRange = this.getDateRange();
      if (dateRange) {
        filtered = filtered.filter((e) => {
          const entryDate = e.datetime;
          return entryDate >= dateRange.from && entryDate <= dateRange.to;
        });
      }
      const searchTerm = this.searchInput.value.toLowerCase().trim();
      if (searchTerm) {
        filtered = filtered.filter((e) => {
          const noteText = this.htmlToPlainText(e.note || "").toLowerCase();
          const titleText = (e.note_title || "").toLowerCase();
          return noteText.includes(searchTerm) || titleText.includes(searchTerm);
        });
      }
      filtered.sort((a, b) => b.datetime - a.datetime);
      this.filteredEntries = filtered;
      this.renderEntries();
    }
    getDateRange() {
      const selection = this.dateRangeSelect.value;
      const now = /* @__PURE__ */ new Date();
      let from, to;
      switch (selection) {
        case "all":
          return null;
        case "thisMonth":
          from = new Date(now.getFullYear(), now.getMonth(), 1);
          to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
          break;
        case "last30":
          from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
          to = now;
          break;
        case "last3Months":
          from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
          to = now;
          break;
        case "thisYear":
          from = new Date(now.getFullYear(), 0, 1);
          to = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
          break;
        case "lastYear":
          from = new Date(now.getFullYear() - 1, 0, 1);
          to = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
          break;
        case "custom": {
          const fromVal = this.dateFrom.value;
          const toVal = this.dateTo.value;
          if (!fromVal && !toVal) return null;
          from = fromVal ? /* @__PURE__ */ new Date(fromVal + "T00:00:00") : /* @__PURE__ */ new Date(0);
          to = toVal ? /* @__PURE__ */ new Date(toVal + "T23:59:59.999") : now;
          break;
        }
        default:
          return null;
      }
      return { from: from.getTime(), to: to.getTime() };
    }
    renderCalendar() {
      const year = this.calendarDate.getFullYear();
      const month = this.calendarDate.getMonth();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      this.calendarTitle.textContent = `${monthNames[month]} ${year}`;
      const entriesMap = this.buildEntriesMap();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();
      let startDay = firstDay.getDay() - 1;
      if (startDay < 0) startDay = 6;
      const today = /* @__PURE__ */ new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
      this.calendarGrid.innerHTML = "";
      for (let i = 0; i < startDay; i++) {
        const prevMonthDay = new Date(year, month, -startDay + i + 1);
        this.calendarGrid.appendChild(this.createDayCell(prevMonthDay, entriesMap, true));
      }
      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const isToday = isCurrentMonth && day === today.getDate();
        this.calendarGrid.appendChild(this.createDayCell(date, entriesMap, false, isToday));
      }
      const cellsUsed = startDay + totalDays;
      const cellsNeeded = Math.ceil(cellsUsed / 7) * 7;
      for (let i = 0; i < cellsNeeded - cellsUsed; i++) {
        const nextMonthDay = new Date(year, month + 1, i + 1);
        this.calendarGrid.appendChild(this.createDayCell(nextMonthDay, entriesMap, true));
      }
    }
    createDayCell(date, entriesMap, isOtherMonth, isToday = false) {
      const cell = document.createElement("div");
      cell.className = "calendar-day";
      cell.textContent = String(date.getDate());
      cell.setAttribute("role", "button");
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const fullDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      if (isOtherMonth) {
        cell.classList.add("other-month");
      }
      if (isToday) {
        cell.classList.add("today");
      }
      const isSelected = this.selectedCalendarDate && date.getFullYear() === this.selectedCalendarDate.getFullYear() && date.getMonth() === this.selectedCalendarDate.getMonth() && date.getDate() === this.selectedCalendarDate.getDate();
      if (isSelected) {
        cell.classList.add("selected");
        cell.setAttribute("aria-pressed", "true");
      } else {
        cell.setAttribute("aria-pressed", "false");
      }
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const cellDate = new Date(date);
      cellDate.setHours(0, 0, 0, 0);
      const isFuture = cellDate > today;
      if (isFuture) {
        cell.classList.add("future");
        cell.setAttribute("aria-disabled", "true");
        cell.setAttribute("aria-label", `${fullDate}, future date`);
        return cell;
      }
      cell.setAttribute("tabindex", "0");
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const dayEntries = entriesMap[dateKey];
      let ariaLabel = fullDate;
      if (dayEntries && dayEntries.length > 0) {
        cell.classList.add("has-entry");
        const moodGroupId = this.getMoodGroupId(dayEntries[0].mood);
        const moodColors = {
          1: "#4ecca3",
          2: "#7ed957",
          3: "#ffd93d",
          4: "#ff8c42",
          5: "#e94560"
        };
        cell.style.setProperty("--mood-color", moodColors[moodGroupId] || "#a0a0a0");
        ariaLabel += `, ${dayEntries.length} ${dayEntries.length === 1 ? "entry" : "entries"}`;
      }
      if (isToday) ariaLabel += ", today";
      if (isSelected) ariaLabel += ", selected";
      cell.setAttribute("aria-label", ariaLabel);
      cell.addEventListener("click", () => this.handleCalendarDayClick(date));
      cell.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleCalendarDayClick(date);
        }
      });
      return cell;
    }
    buildEntriesMap() {
      const map = {};
      const notesOnly = this.filterNotes.checked;
      for (const entry of this.entries) {
        if (notesOnly && (!entry.note || entry.note.length === 0)) {
          continue;
        }
        const date = new Date(entry.datetime);
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (!map[key]) map[key] = [];
        map[key].push(entry);
      }
      return map;
    }
    handleCalendarDayClick(date) {
      if (this.selectedCalendarDate && date.getFullYear() === this.selectedCalendarDate.getFullYear() && date.getMonth() === this.selectedCalendarDate.getMonth() && date.getDate() === this.selectedCalendarDate.getDate()) {
        this.selectedCalendarDate = null;
        this.dateRangeSelect.value = "all";
        this.customDateRange.classList.add("hidden");
      } else {
        this.selectedCalendarDate = date;
        this.dateRangeSelect.value = "custom";
        this.customDateRange.classList.remove("hidden");
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        this.dateFrom.value = dateStr;
        this.dateTo.value = dateStr;
      }
      this.renderCalendar();
      this.applyFilters();
    }
    initVirtualScroll() {
      this.entriesPanel.addEventListener("scroll", () => this.handleScroll());
      this.entriesList.setAttribute("role", "listbox");
      this.entriesList.setAttribute("aria-label", "Journal entries");
      this.entriesList.addEventListener("keydown", (e) => this.handleEntryListKeydown(e));
    }
    handleEntryListKeydown(e) {
      const focusedEl = document.activeElement;
      if (!focusedEl?.classList.contains("entry-item")) return;
      const currentIndex = parseInt(focusedEl.dataset.virtualIndex || "0");
      let nextIndex = null;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, this.filteredEntries.length - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          const originalIndex = parseInt(focusedEl.dataset.index || "0");
          this.selectEntry(originalIndex);
          return;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = this.filteredEntries.length - 1;
          break;
        case "Escape":
          e.preventDefault();
          this.deselectEntry();
          return;
        default:
          return;
      }
      if (nextIndex !== null && nextIndex !== currentIndex) {
        this.scrollToEntry(nextIndex);
        requestAnimationFrame(() => {
          const nextEl = this.entriesList.querySelector(`.entry-item[data-virtual-index="${nextIndex}"]`);
          nextEl?.focus();
        });
      }
    }
    scrollToEntry(virtualIndex) {
      const entriesListOffset = this.entriesList.offsetTop;
      const targetScrollTop = entriesListOffset + virtualIndex * this.itemHeight;
      const containerHeight = this.entriesPanel.clientHeight;
      const currentScrollTop = this.entriesPanel.scrollTop;
      if (targetScrollTop < currentScrollTop) {
        this.entriesPanel.scrollTop = targetScrollTop;
      } else if (targetScrollTop + this.itemHeight > currentScrollTop + containerHeight) {
        this.entriesPanel.scrollTop = targetScrollTop - containerHeight + this.itemHeight;
      }
    }
    handleScroll() {
      if (this.scrollRAF) return;
      this.scrollRAF = requestAnimationFrame(() => {
        this.scrollRAF = null;
        this.renderVirtualEntries(false);
      });
    }
    calculateVisibleRange() {
      const panelScrollTop = this.entriesPanel.scrollTop;
      const entriesListOffset = this.entriesList.offsetTop;
      const panelHeight = this.entriesPanel.clientHeight;
      const totalItems = this.filteredEntries.length;
      const effectiveScrollTop = Math.max(0, panelScrollTop - entriesListOffset);
      const visibleTop = Math.max(0, entriesListOffset - panelScrollTop);
      const visibleHeight = panelHeight - visibleTop;
      const visibleStart = Math.floor(effectiveScrollTop / this.itemHeight);
      const visibleCount = Math.ceil(visibleHeight / this.itemHeight);
      const visibleEnd = Math.min(visibleStart + visibleCount, totalItems);
      const bufferedStart = Math.max(0, visibleStart - this.bufferSize);
      const bufferedEnd = Math.min(totalItems, visibleEnd + this.bufferSize);
      return { bufferedStart, bufferedEnd, totalItems };
    }
    renderVirtualEntries(forceRender = true) {
      const { bufferedStart, bufferedEnd, totalItems } = this.calculateVisibleRange();
      if (!forceRender && bufferedStart === this.lastVisibleStart && bufferedEnd === this.lastVisibleEnd) {
        return;
      }
      this.lastVisibleStart = bufferedStart;
      this.lastVisibleEnd = bufferedEnd;
      const searchTerm = this.searchInput.value.trim();
      const fragment = document.createDocumentFragment();
      if (bufferedStart > 0) {
        const topSpacer = document.createElement("div");
        topSpacer.className = "virtual-spacer";
        topSpacer.style.height = `${bufferedStart * this.itemHeight}px`;
        fragment.appendChild(topSpacer);
      }
      for (let i = bufferedStart; i < bufferedEnd; i++) {
        const entry = this.filteredEntries[i];
        const originalIndex = this.entries.indexOf(entry);
        const div = document.createElement("div");
        div.className = "entry-item";
        div.dataset.index = String(originalIndex);
        div.dataset.virtualIndex = String(i);
        div.setAttribute("role", "option");
        div.setAttribute("tabindex", "0");
        const isActive = originalIndex === this.currentEntryIndex;
        if (isActive) {
          div.classList.add("active");
          div.setAttribute("aria-selected", "true");
        } else {
          div.setAttribute("aria-selected", "false");
        }
        const date = this.formatDate(entry);
        const preview = this.getPreview(entry, searchTerm);
        const moodGroupId = this.getMoodGroupId(entry.mood);
        const moodClass = `mood-${moodGroupId}`;
        const moodLabel = this.getMoodLabel(entry.mood);
        const plainPreview = this.htmlToPlainText(entry.note || "").substring(0, 50);
        const ariaLabel = `${date}, ${moodLabel}${plainPreview ? ", " + plainPreview : ""}`;
        div.setAttribute("aria-label", ariaLabel);
        const hasContent = entry.note_title?.trim() || entry.note;
        const hasPhotos = entry.assets && entry.assets.length > 0;
        const photoIcon = hasPhotos ? '<span class="photo-icon" aria-hidden="true">\u{1F4F7}</span>' : "";
        const photoSrText = hasPhotos ? '<span class="sr-only">, has photos</span>' : "";
        const activityCount = entry.tags?.length || 0;
        const activityIndicator = activityCount > 0 ? `<span class="activity-indicator" aria-hidden="true">${activityCount} activities</span>` : "";
        const activitySrText = activityCount > 0 ? `<span class="sr-only">, ${activityCount} activities</span>` : "";
        div.innerHTML = `
                <div class="entry-header">
                    <span class="entry-date">${date}</span>
                    <span class="entry-indicators">${activityIndicator}${activitySrText}${photoIcon}${photoSrText}</span>
                    <span class="mood-badge ${moodClass}">${moodLabel}</span>
                </div>
                <div class="${hasContent ? "entry-preview" : "entry-no-note"}">${preview}</div>
            `;
        div.addEventListener("click", () => this.selectEntry(originalIndex));
        fragment.appendChild(div);
      }
      const remainingItems = totalItems - bufferedEnd;
      if (remainingItems > 0) {
        const bottomSpacer = document.createElement("div");
        bottomSpacer.className = "virtual-spacer";
        bottomSpacer.style.height = `${remainingItems * this.itemHeight}px`;
        fragment.appendChild(bottomSpacer);
      }
      this.entriesList.innerHTML = "";
      this.entriesList.appendChild(fragment);
    }
    renderEntries() {
      this.lastVisibleStart = -1;
      this.lastVisibleEnd = -1;
      this.entriesPanel.scrollTop = 0;
      this.renderVirtualEntries(true);
    }
    formatDate(entry) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return `${months[entry.month]} ${entry.day}, ${entry.year}`;
    }
    getPreview(entry, searchTerm = "") {
      const hasNote = entry.note && entry.note.length > 0;
      const hasTitle = entry.note_title && entry.note_title.trim();
      if (!hasTitle && !hasNote) {
        return this.escapeHtml("No note");
      }
      if (searchTerm && hasNote) {
        const plain = this.htmlToPlainText(entry.note);
        const lowerPlain = plain.toLowerCase();
        const lowerTerm = searchTerm.toLowerCase();
        const matchIndex = lowerPlain.indexOf(lowerTerm);
        if (matchIndex !== -1) {
          const snippetLength = 60;
          const termLength = searchTerm.length;
          let start = Math.max(0, matchIndex - Math.floor((snippetLength - termLength) / 2));
          let end = Math.min(plain.length, start + snippetLength);
          if (end === plain.length) {
            start = Math.max(0, end - snippetLength);
          }
          let snippet = plain.substring(start, end);
          if (start > 0) snippet = "..." + snippet;
          if (end < plain.length) snippet = snippet + "...";
          return this.highlightText(snippet, searchTerm);
        }
      }
      let text;
      if (hasTitle) {
        text = entry.note_title.trim();
      } else {
        const plain = this.htmlToPlainText(entry.note);
        text = plain.length > 60 ? plain.substring(0, 60) + "..." : plain;
      }
      return this.highlightText(text, searchTerm);
    }
    selectEntry(index) {
      this.currentEntryIndex = index;
      const entry = this.entries[index];
      this.editorPlaceholder.classList.add("hidden");
      this.editor.classList.remove("hidden");
      this.editorDate.textContent = this.formatDate(entry);
      this.editorMood.textContent = this.getMoodLabel(entry.mood);
      this.editorMood.className = `mood-badge mood-${this.getMoodGroupId(entry.mood)}`;
      this.noteTitleInput.value = entry.note_title || "";
      const cleanHtml = this.daylioToQuillHtml(entry.note || "");
      const delta = this.quill.clipboard.convert({ html: cleanHtml });
      this.quill.setContents(delta, "silent");
      this.quill.history.clear();
      this.revertBtn.classList.add("hidden");
      this.renderActivities(entry);
      document.querySelectorAll(".entry-item").forEach((el) => {
        const htmlEl = el;
        el.classList.toggle("active", parseInt(htmlEl.dataset.index || "") === index);
        htmlEl.setAttribute("aria-selected", parseInt(htmlEl.dataset.index || "") === index ? "true" : "false");
      });
      this.announceToScreenReader(`Selected entry: ${this.formatDate(entry)}, ${this.getMoodLabel(entry.mood)}`);
      this.renderPhotos(entry);
    }
    deselectEntry() {
      this.currentEntryIndex = -1;
      this.editor.classList.add("hidden");
      this.editorPlaceholder.classList.remove("hidden");
      document.querySelectorAll(".entry-item").forEach((el) => {
        el.classList.remove("active");
        el.setAttribute("aria-selected", "false");
      });
      this.announceToScreenReader("Entry deselected");
    }
    announceToScreenReader(message) {
      let liveRegion = document.getElementById("srAnnouncer");
      if (!liveRegion) {
        liveRegion = document.createElement("div");
        liveRegion.id = "srAnnouncer";
        liveRegion.className = "sr-only";
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("aria-atomic", "true");
        document.body.appendChild(liveRegion);
      }
      liveRegion.textContent = "";
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    }
    renderActivities(entry) {
      const tagNames = this.getEntryTags(entry);
      if (tagNames.length === 0) {
        this.activitiesSection.classList.add("hidden");
        return;
      }
      this.activitiesContainer.innerHTML = tagNames.map((name) => `<span class="activity-chip">${this.escapeHtml(name)}</span>`).join("");
      this.activitiesSection.classList.remove("hidden");
    }
    renderPhotos(entry) {
      this.currentEntryPhotos.forEach((url) => URL.revokeObjectURL(url));
      this.photoThumbnails.innerHTML = "";
      this.currentEntryPhotos = [];
      const entryAssetIds = entry.assets || [];
      if (entryAssetIds.length === 0) {
        this.photoSection.classList.add("hidden");
        return;
      }
      if (!this.assetMap) {
        this.assetMap = {};
        (this.data?.assets || []).forEach((asset) => {
          this.assetMap[asset.id] = asset;
        });
      }
      entryAssetIds.forEach((assetId, index) => {
        const asset = this.assetMap[assetId];
        if (!asset) return;
        const createdAt = new Date(asset.createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1;
        const assetPath = `assets/photos/${year}/${month}/${asset.checksum}`;
        const assetData = this.assets[assetPath];
        if (assetData) {
          const url = this.createImageUrl(assetData);
          this.currentEntryPhotos.push(url);
          const thumb = document.createElement("div");
          thumb.className = "photo-thumbnail";
          thumb.innerHTML = `<img src="${url}" alt="Photo ${index + 1}">`;
          thumb.addEventListener("click", () => this.openLightbox(this.currentEntryPhotos.length - 1));
          this.photoThumbnails.appendChild(thumb);
        }
      });
      if (this.currentEntryPhotos.length > 0) {
        this.photoSection.classList.remove("hidden");
        this.photoCount.textContent = String(this.currentEntryPhotos.length);
      } else {
        this.photoSection.classList.add("hidden");
      }
    }
    createImageUrl(data) {
      let mimeType = "image/jpeg";
      if (data[0] === 137 && data[1] === 80) {
        mimeType = "image/png";
      } else if (data[0] === 71 && data[1] === 73) {
        mimeType = "image/gif";
      }
      const blob = new Blob([data], { type: mimeType });
      return URL.createObjectURL(blob);
    }
    openLightbox(index) {
      if (this.currentEntryPhotos.length === 0) return;
      this.lightboxTrigger = document.activeElement;
      this.currentPhotoIndex = index;
      this.updateLightboxImage();
      this.photoLightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      this.lightboxClose.focus();
      this.photoLightbox.addEventListener("keydown", this.handleLightboxKeydown);
    }
    closeLightbox() {
      this.photoLightbox.classList.add("hidden");
      document.body.style.overflow = "";
      this.photoLightbox.removeEventListener("keydown", this.handleLightboxKeydown);
      if (this.lightboxTrigger) {
        this.lightboxTrigger.focus();
        this.lightboxTrigger = null;
      }
    }
    showPrevPhoto() {
      if (this.currentEntryPhotos.length === 0) return;
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.currentEntryPhotos.length) % this.currentEntryPhotos.length;
      this.updateLightboxImage();
    }
    showNextPhoto() {
      if (this.currentEntryPhotos.length === 0) return;
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.currentEntryPhotos.length;
      this.updateLightboxImage();
    }
    updateLightboxImage() {
      this.lightboxImage.src = this.currentEntryPhotos[this.currentPhotoIndex];
      this.lightboxCounter.textContent = `${this.currentPhotoIndex + 1} / ${this.currentEntryPhotos.length}`;
      const hasMultiple = this.currentEntryPhotos.length > 1;
      this.lightboxPrev.style.display = hasMultiple ? "" : "none";
      this.lightboxNext.style.display = hasMultiple ? "" : "none";
    }
    // ==================== Insights Dashboard ====================
    openInsights() {
      this.insightsModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      this.insightsClose.focus();
      if (this.entries.length > 0) {
        this.insightsYear = new Date(this.entries[0].datetime).getFullYear();
      } else {
        this.insightsYear = (/* @__PURE__ */ new Date()).getFullYear();
      }
      this.populateActivityDropdown();
      this.insightsDateRange.value = "all";
      this.insightsActivity.value = "all";
      this.applyInsightsFilters();
    }
    populateActivityDropdown() {
      const activityCounts = {};
      for (const entry of this.entries) {
        for (const tagId of entry.tags || []) {
          activityCounts[tagId] = (activityCounts[tagId] || 0) + 1;
        }
      }
      const sortedActivities = Object.entries(activityCounts).map(([id, count]) => ({ id: Number(id), count })).sort((a, b) => b.count - a.count);
      let html = '<option value="all">All Activities</option>';
      for (const { id } of sortedActivities) {
        const name = this.tags[id] || `Activity ${id}`;
        html += `<option value="${id}">${this.escapeHtml(name)}</option>`;
      }
      this.insightsActivity.innerHTML = html;
    }
    applyInsightsFilters() {
      const dateRange = this.insightsDateRange.value;
      const activityId = this.insightsActivity.value;
      let filtered = [...this.entries];
      if (dateRange !== "all") {
        const now = /* @__PURE__ */ new Date();
        let startDate;
        let endDate = now;
        switch (dateRange) {
          case "thisMonth":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          case "last30":
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
            break;
          case "last3Months":
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            break;
          case "thisYear":
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
          case "lastYear":
            startDate = new Date(now.getFullYear() - 1, 0, 1);
            endDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59);
            break;
          default:
            startDate = /* @__PURE__ */ new Date(0);
        }
        filtered = filtered.filter((entry) => {
          const entryDate = new Date(entry.datetime);
          return entryDate >= startDate && entryDate <= endDate;
        });
      }
      if (activityId !== "all") {
        const tagId = Number(activityId);
        filtered = filtered.filter(
          (entry) => (entry.tags || []).includes(tagId)
        );
      }
      this.insightsFilteredEntries = filtered;
      const total = this.entries.length;
      const showing = filtered.length;
      if (showing === total) {
        this.filterSummary.textContent = `Showing all ${total} entries`;
      } else {
        this.filterSummary.textContent = `Showing ${showing} of ${total} entries`;
      }
      this.renderInsights();
    }
    closeInsights() {
      this.insightsModal.classList.add("hidden");
      document.body.style.overflow = "";
      this.insightsBtn.focus();
    }
    async exportInsights() {
      const insightsBody = this.insightsModal.querySelector(".insights-body");
      if (!insightsBody) return;
      const originalText = this.exportInsightsBtn.textContent;
      this.exportInsightsBtn.textContent = "Exporting...";
      this.exportInsightsBtn.disabled = true;
      try {
        const canvas = await html2canvas(insightsBody, {
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim() || "#1a1a2e",
          scale: 2,
          // Higher resolution
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        canvas.toBlob((blob) => {
          if (!blob) {
            this.showToast("Failed to generate image", "error");
            return;
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const dateRange = this.insightsDateRange.value;
          const activity = this.insightsActivity.value !== "all" ? `_${this.tags[Number(this.insightsActivity.value)] || "activity"}` : "";
          const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
          link.download = `daylio-insights_${dateRange}${activity}_${timestamp}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          this.showToast("Insights exported successfully", "success");
        }, "image/png");
      } catch (error) {
        console.error("Export failed:", error);
        this.showToast("Failed to export insights", "error");
      } finally {
        this.exportInsightsBtn.textContent = originalText;
        this.exportInsightsBtn.disabled = false;
      }
    }
    changeInsightsYear(delta) {
      this.insightsYear += delta;
      this.yearLabel.textContent = String(this.insightsYear);
      this.renderYearPixels();
    }
    renderInsights() {
      this.renderQuickStats();
      this.renderYearPixels();
      this.renderMoodBreakdown();
      this.renderMoodTrends();
      this.renderTopActivities();
      this.renderEntriesPerMonth();
    }
    renderQuickStats() {
      const entries = this.insightsFilteredEntries;
      this.statTotalEntries.textContent = String(entries.length);
      const { currentStreak, longestStreak } = this.calculateStreaks(entries);
      this.statCurrentStreak.textContent = `${currentStreak} days`;
      this.statLongestStreak.textContent = `${longestStreak} days`;
      if (entries.length > 0) {
        let totalMoodGroup = 0;
        let count = 0;
        for (const entry of entries) {
          const moodGroup = this.getMoodGroupId(entry.mood);
          if (moodGroup >= 1 && moodGroup <= 5) {
            totalMoodGroup += moodGroup;
            count++;
          }
        }
        if (count > 0) {
          const avg = totalMoodGroup / count;
          const starRating = (6 - avg).toFixed(1);
          this.statAvgMood.textContent = `${starRating}/5`;
        } else {
          this.statAvgMood.textContent = "-";
        }
      } else {
        this.statAvgMood.textContent = "-";
      }
    }
    calculateStreaks(entries) {
      if (entries.length === 0) {
        return { currentStreak: 0, longestStreak: 0 };
      }
      const entryDates = /* @__PURE__ */ new Set();
      for (const entry of entries) {
        const date = new Date(entry.datetime);
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        entryDates.add(dateStr);
      }
      const sortedDates = Array.from(entryDates).sort().reverse();
      const today = /* @__PURE__ */ new Date();
      let currentStreak = 0;
      let checkDate = new Date(today);
      while (true) {
        const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
        if (entryDates.has(dateStr)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (currentStreak === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          const yesterdayStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
          if (!entryDates.has(yesterdayStr)) {
            break;
          }
        } else {
          break;
        }
      }
      let longestStreak = 0;
      let streak = 0;
      let prevDate = null;
      for (const dateStr of sortedDates) {
        const [year, month, day] = dateStr.split("-").map(Number);
        const currentDate = new Date(year, month - 1, day);
        if (prevDate === null) {
          streak = 1;
        } else {
          const diffDays = Math.round((prevDate.getTime() - currentDate.getTime()) / (1e3 * 60 * 60 * 24));
          if (diffDays === 1) {
            streak++;
          } else {
            longestStreak = Math.max(longestStreak, streak);
            streak = 1;
          }
        }
        prevDate = currentDate;
      }
      longestStreak = Math.max(longestStreak, streak);
      return { currentStreak, longestStreak };
    }
    renderYearPixels() {
      this.yearLabel.textContent = String(this.insightsYear);
      const moodMap = /* @__PURE__ */ new Map();
      for (const entry of this.insightsFilteredEntries) {
        const date = new Date(entry.datetime);
        if (date.getFullYear() === this.insightsYear) {
          const key = `${date.getMonth()}-${date.getDate()}`;
          if (!moodMap.has(key)) {
            moodMap.set(key, this.getMoodGroupId(entry.mood));
          }
        }
      }
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.monthLabels.innerHTML = months.map((m) => `<div class="month-label">${m}</div>`).join("");
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (this.insightsYear % 4 === 0 && this.insightsYear % 100 !== 0 || this.insightsYear % 400 === 0) {
        daysInMonth[1] = 29;
      }
      let html = "";
      for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
          const key = `${month}-${day}`;
          const moodGroup = moodMap.get(key);
          if (day <= daysInMonth[month]) {
            const moodClass = moodGroup ? `mood-${moodGroup}` : "empty";
            const dateStr = `${months[month]} ${day}, ${this.insightsYear}`;
            const moodLabel = moodGroup ? this.getMoodLabelByGroup(moodGroup) : "No entry";
            html += `<div class="pixel ${moodClass}" title="${dateStr}: ${moodLabel}" data-month="${month}" data-day="${day}"></div>`;
          } else {
            html += `<div class="pixel" style="visibility: hidden;"></div>`;
          }
        }
      }
      this.yearPixelsGrid.innerHTML = html;
      this.yearPixelsGrid.querySelectorAll(".pixel:not(.empty)").forEach((pixel) => {
        pixel.addEventListener("click", (e) => {
          const target = e.target;
          const month = parseInt(target.dataset.month || "0");
          const day = parseInt(target.dataset.day || "1");
          this.jumpToDate(this.insightsYear, month, day);
        });
      });
    }
    getMoodLabelByGroup(groupId) {
      const labels = ["", "Great", "Good", "Meh", "Bad", "Awful"];
      return labels[groupId] || "";
    }
    jumpToDate(year, month, day) {
      const entry = this.entries.find((e) => {
        const d = new Date(e.datetime);
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
      });
      if (entry) {
        const index = this.entries.indexOf(entry);
        this.closeInsights();
        this.selectEntry(index);
        this.scrollToEntry(this.filteredEntries.indexOf(entry));
      }
    }
    renderMoodBreakdown() {
      const moodCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let total = 0;
      for (const entry of this.insightsFilteredEntries) {
        const groupId = this.getMoodGroupId(entry.mood);
        if (groupId >= 1 && groupId <= 5) {
          moodCounts[groupId]++;
          total++;
        }
      }
      if (total === 0) {
        this.moodBreakdown.innerHTML = '<p style="color: var(--text-secondary);">No mood data available</p>';
        return;
      }
      const labels = ["", "Great", "Good", "Meh", "Bad", "Awful"];
      let html = "";
      for (let i = 1; i <= 5; i++) {
        const count = moodCounts[i];
        const percent = (count / total * 100).toFixed(1);
        html += `
                <div class="mood-bar-row">
                    <span class="mood-bar-label">${labels[i]}</span>
                    <div class="mood-bar-container">
                        <div class="mood-bar mood-${i}" style="width: ${percent}%"></div>
                    </div>
                    <span class="mood-bar-percent">${percent}%</span>
                </div>
            `;
      }
      this.moodBreakdown.innerHTML = html;
    }
    renderMoodTrends() {
      const entries = this.insightsFilteredEntries;
      if (entries.length < 2) {
        this.moodTrendsChart.innerHTML = '<text x="300" y="100" text-anchor="middle" class="axis-label">Not enough data for trends</text>';
        return;
      }
      const weeklyMoods = [];
      const weekMap = /* @__PURE__ */ new Map();
      const sorted = [...entries].sort((a, b) => a.datetime - b.datetime);
      for (const entry of sorted) {
        const date = new Date(entry.datetime);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        const weekStart = new Date(date.setDate(diff));
        const weekKey = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}-${String(weekStart.getDate()).padStart(2, "0")}`;
        const moodGroup = this.getMoodGroupId(entry.mood);
        if (moodGroup >= 1 && moodGroup <= 5) {
          const existing = weekMap.get(weekKey) || { total: 0, count: 0 };
          existing.total += 6 - moodGroup;
          existing.count++;
          weekMap.set(weekKey, existing);
        }
      }
      for (const [week, data] of weekMap) {
        weeklyMoods.push({
          week,
          avg: data.total / data.count,
          count: data.count
        });
      }
      weeklyMoods.sort((a, b) => a.week.localeCompare(b.week));
      const displayData = weeklyMoods.slice(-52);
      if (displayData.length < 2) {
        this.moodTrendsChart.innerHTML = '<text x="300" y="100" text-anchor="middle" class="axis-label">Not enough data for trends</text>';
        return;
      }
      const width = 600;
      const height = 200;
      const padding = { top: 20, right: 20, bottom: 30, left: 40 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const xScale = (i) => padding.left + i / (displayData.length - 1) * chartWidth;
      const yScale = (v) => padding.top + chartHeight - (v - 1) / 4 * chartHeight;
      let svg = "";
      for (let i = 1; i <= 5; i++) {
        const y = yScale(i);
        svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="grid-line"/>`;
        svg += `<text x="${padding.left - 5}" y="${y + 3}" text-anchor="end" class="mood-label">${i}</text>`;
      }
      svg += `<text x="${padding.left - 25}" y="${height / 2}" text-anchor="middle" transform="rotate(-90, ${padding.left - 25}, ${height / 2})" class="axis-label">Mood</text>`;
      let pathD = "";
      let areaD = "";
      const points = [];
      for (let i = 0; i < displayData.length; i++) {
        const x = xScale(i);
        const y = yScale(displayData[i].avg);
        if (i === 0) {
          pathD = `M ${x} ${y}`;
          areaD = `M ${x} ${padding.top + chartHeight} L ${x} ${y}`;
        } else {
          pathD += ` L ${x} ${y}`;
          areaD += ` L ${x} ${y}`;
        }
        points.push(`<circle cx="${x}" cy="${y}" r="4" class="data-point" title="${displayData[i].week}: ${displayData[i].avg.toFixed(1)}/5"/>`);
      }
      areaD += ` L ${xScale(displayData.length - 1)} ${padding.top + chartHeight} Z`;
      svg += `<path d="${areaD}" class="trend-area"/>`;
      svg += `<path d="${pathD}" class="trend-line"/>`;
      svg += points.join("");
      const labelIndices = [0, Math.floor(displayData.length / 2), displayData.length - 1];
      for (const i of labelIndices) {
        const x = xScale(i);
        const label = displayData[i].week.slice(5);
        svg += `<text x="${x}" y="${height - 5}" text-anchor="middle" class="axis-label">${label}</text>`;
      }
      this.moodTrendsChart.innerHTML = svg;
    }
    renderTopActivities() {
      const entries = this.insightsFilteredEntries;
      const selectedActivityId = this.insightsActivity.value;
      const isFilteredByActivity = selectedActivityId !== "all";
      const activityStats = {};
      for (const entry of entries) {
        const moodGroup = this.getMoodGroupId(entry.mood);
        const moodScore = moodGroup >= 1 && moodGroup <= 5 ? 6 - moodGroup : 0;
        for (const tagId of entry.tags || []) {
          if (isFilteredByActivity && tagId === Number(selectedActivityId)) {
            continue;
          }
          if (!activityStats[tagId]) {
            activityStats[tagId] = { count: 0, moodTotal: 0 };
          }
          activityStats[tagId].count++;
          if (moodScore > 0) {
            activityStats[tagId].moodTotal += moodScore;
          }
        }
      }
      const sorted = Object.entries(activityStats).map(([id, stats]) => ({
        id: Number(id),
        name: this.tags[Number(id)] || `Activity ${id}`,
        count: stats.count,
        avgMood: stats.moodTotal / stats.count
      })).sort((a, b) => b.count - a.count).slice(0, 10);
      if (sorted.length === 0) {
        const message = isFilteredByActivity ? "No co-occurring activities found" : "No activity data available";
        this.topActivities.innerHTML = `<p class="no-data-message">${message}</p>`;
        return;
      }
      const maxCount = sorted[0].count;
      const selectedActivityName = isFilteredByActivity ? this.tags[Number(selectedActivityId)] || "selected activity" : "";
      let html = "";
      if (isFilteredByActivity) {
        html += `<p class="co-occurring-label">Activities that co-occur with "${this.escapeHtml(selectedActivityName)}":</p>`;
      }
      for (const activity of sorted) {
        const barWidth = activity.count / maxCount * 100;
        const moodColor = this.getMoodColorByScore(activity.avgMood);
        html += `
                <div class="activity-stat">
                    <span class="activity-stat-name" title="${this.escapeHtml(activity.name)}">${this.escapeHtml(activity.name)}</span>
                    <div class="activity-stat-bar-container">
                        <div class="activity-stat-bar" style="width: ${barWidth}%; background: ${moodColor};"></div>
                    </div>
                    <span class="activity-stat-count">${activity.count}\xD7</span>
                    <span class="activity-stat-mood" title="Avg mood">${activity.avgMood.toFixed(1)}/5</span>
                </div>
            `;
      }
      this.topActivities.innerHTML = html;
    }
    getMoodColorByScore(score) {
      if (score >= 4.5) return "var(--mood-great)";
      if (score >= 3.5) return "var(--mood-good)";
      if (score >= 2.5) return "var(--mood-meh)";
      if (score >= 1.5) return "var(--mood-bad)";
      return "var(--mood-awful)";
    }
    renderEntriesPerMonth() {
      const entries = this.insightsFilteredEntries;
      if (entries.length === 0) {
        this.entriesPerMonth.innerHTML = '<p class="no-data-message">No entries to display</p>';
        return;
      }
      const sorted = [...entries].sort((a, b) => a.datetime - b.datetime);
      const firstDate = new Date(sorted[0].datetime);
      const lastDate = new Date(sorted[sorted.length - 1].datetime);
      const monthCounts = [];
      const countMap = /* @__PURE__ */ new Map();
      for (const entry of entries) {
        const date = new Date(entry.datetime);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        countMap.set(key, (countMap.get(key) || 0) + 1);
      }
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let current = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
      const end = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);
      while (current <= end) {
        const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
        const label = `${months[current.getMonth()]} ${String(current.getFullYear()).slice(2)}`;
        monthCounts.push({
          key,
          label,
          count: countMap.get(key) || 0
        });
        current.setMonth(current.getMonth() + 1);
      }
      const displayData = monthCounts.slice(-12);
      if (displayData.length === 0) {
        this.entriesPerMonth.innerHTML = '<p class="no-data-message">No entries to display</p>';
        return;
      }
      const maxCount = Math.max(...displayData.map((m) => m.count));
      const maxBarHeight = 100;
      let html = "";
      for (const month of displayData) {
        const barHeight = maxCount > 0 ? Math.round(month.count / maxCount * maxBarHeight) : 0;
        html += `
                <div class="month-bar-container">
                    <span class="month-bar-count">${month.count || ""}</span>
                    <div class="month-bar" style="height: ${barHeight}px;" title="${month.label}: ${month.count} entries"></div>
                    <span class="month-bar-label">${month.label}</span>
                </div>
            `;
      }
      this.entriesPerMonth.innerHTML = html;
    }
    updateCurrentEntry() {
      if (this.currentEntryIndex === null) return;
      const entry = this.entries[this.currentEntryIndex];
      entry.note_title = this.noteTitleInput.value;
      const quillHtml = this.quill.root.innerHTML;
      entry.note = this.quillToDaylioHtml(quillHtml);
      this.markUnsavedChanges();
      this.updateEntryPreview(this.currentEntryIndex);
      const original = this.originalEntryStates.get(this.currentEntryIndex);
      if (original) {
        const hasChanges = entry.note !== original.note || entry.note_title !== original.note_title;
        this.revertBtn.classList.toggle("hidden", !hasChanges);
      }
    }
    revertEntry() {
      if (this.currentEntryIndex === null) return;
      const original = this.originalEntryStates.get(this.currentEntryIndex);
      if (!original) return;
      const entry = this.entries[this.currentEntryIndex];
      entry.note = original.note;
      entry.note_title = original.note_title;
      this.noteTitleInput.value = entry.note_title;
      const cleanHtml = this.daylioToQuillHtml(entry.note);
      const delta = this.quill.clipboard.convert({ html: cleanHtml });
      this.quill.setContents(delta, "silent");
      this.quill.history.clear();
      this.updateEntryPreview(this.currentEntryIndex);
      this.revertBtn.classList.add("hidden");
      if (!this.hasAnyChanges()) {
        this.clearUnsavedChanges();
      }
      this.showToast("info", "Entry Reverted", "Entry restored to its original state.");
    }
    updateEntryPreview(originalIndex) {
      const entryEl = this.entriesList.querySelector(`.entry-item[data-index="${originalIndex}"]`);
      if (!entryEl) return;
      const entry = this.entries[originalIndex];
      const searchTerm = this.searchInput.value.trim();
      const preview = this.getPreview(entry, searchTerm);
      const hasContent = entry.note_title?.trim() || entry.note;
      const previewEl = entryEl.querySelector(".entry-preview, .entry-no-note");
      if (previewEl) {
        previewEl.className = hasContent ? "entry-preview" : "entry-no-note";
        previewEl.innerHTML = preview;
      }
    }
    markUnsavedChanges() {
      if (!this.hasUnsavedChanges) {
        this.hasUnsavedChanges = true;
        this.saveBtn.classList.add("has-changes");
        this.saveBtn.textContent = "Download Backup *";
      }
    }
    clearUnsavedChanges() {
      this.hasUnsavedChanges = false;
      this.saveBtn.classList.remove("has-changes");
      this.saveBtn.textContent = "Download Backup";
    }
    // HTML conversion methods (duplicated from conversions.ts for class use)
    daylioToQuillHtml(html) {
      if (!html) return "";
      let result = html;
      result = result.replace(/<span[^>]*>/gi, "");
      result = result.replace(/<\/span>/gi, "");
      result = result.replace(/<p[^>]*>/gi, "<p>");
      result = result.replace(/<li([^>]*)>/gi, (_match, attrs) => {
        const dataListMatch = attrs.match(/data-list="([^"]*)"/);
        if (dataListMatch) {
          return `<li data-list="${dataListMatch[1]}">`;
        }
        return "<li>";
      });
      result = result.replace(/<div><br\s*\/?><\/div>/gi, "<p><br></p>");
      result = result.replace(/<div>/gi, "<p>");
      result = result.replace(/<\/div>/gi, "</p>");
      result = result.replace(/\\n/g, "<br>");
      result = result.replace(/<b>/gi, "<strong>");
      result = result.replace(/<\/b>/gi, "</strong>");
      result = result.replace(/<i>/gi, "<em>");
      result = result.replace(/<\/i>/gi, "</em>");
      result = result.replace(/<strike>/gi, "<s>");
      result = result.replace(/<\/strike>/gi, "</s>");
      result = result.replace(/<font[^>]*>/gi, "");
      result = result.replace(/<\/font>/gi, "");
      result = this.convertBrToQuillParagraphs(result);
      result = result.replace(/^(<p><br><\/p>)+/, "");
      result = this.addQuillListAttributes(result);
      return result;
    }
    convertBrToQuillParagraphs(html) {
      if (!html) return html;
      let result = html;
      const BLANK_LINE_PLACEHOLDER = "___BLANK_LINE_PLACEHOLDER___";
      result = result.replace(/<p><br\s*\/?><\/p>/gi, BLANK_LINE_PLACEHOLDER);
      const BR_PLACEHOLDER = "___BR_PLACEHOLDER___";
      result = result.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, `</p><p>${BR_PLACEHOLDER}</p><p>`);
      result = result.replace(/<br\s*\/?>/gi, "</p><p>");
      result = result.replace(new RegExp(BR_PLACEHOLDER, "g"), "<br>");
      result = result.replace(new RegExp(BLANK_LINE_PLACEHOLDER, "g"), "<p><br></p>");
      if (result && !result.startsWith("<")) {
        const firstTagMatch = result.match(/<[^>]+>/);
        if (firstTagMatch) {
          const firstTagIndex = result.indexOf(firstTagMatch[0]);
          const leadingText = result.substring(0, firstTagIndex);
          const rest = result.substring(firstTagIndex);
          if (leadingText.trim()) {
            result = `<p>${leadingText}</p>${rest}`;
          }
        } else {
          result = `<p>${result}</p>`;
        }
      }
      result = result.replace(/<\/p>\s*<\/p>/gi, "</p>");
      result = result.replace(/<p>\s*<p>/gi, "<p>");
      result = result.replace(/<p><\/p>/g, "");
      return result;
    }
    addQuillListAttributes(html) {
      if (!html) return html;
      const parser = new DOMParser();
      const doc = parser.parseFromString("<div>" + html + "</div>", "text/html");
      const container = doc.body.firstChild;
      container.querySelectorAll("ol > li").forEach((li) => {
        if (!li.getAttribute("data-list")) {
          li.setAttribute("data-list", "ordered");
        }
      });
      container.querySelectorAll("ul > li").forEach((li) => {
        if (!li.getAttribute("data-list")) {
          li.setAttribute("data-list", "bullet");
        }
      });
      return container.innerHTML;
    }
    quillToDaylioHtml(html) {
      if (!html || html === "<p><br></p>") return "";
      let result = html;
      result = result.replace(/<span class="ql-ui"[^>]*>.*?<\/span>/gi, "");
      result = result.replace(/<ol>(\s*<li data-list="bullet">)/gi, "<ul><li>");
      result = result.replace(/<li data-list="bullet">/gi, "<li>");
      result = result.replace(/<\/li>(\s*)<\/ol>/gi, (match, space, offset) => {
        const before = result.substring(0, offset);
        if (before.lastIndexOf("<ul>") > before.lastIndexOf("<ol>")) {
          return "</li>" + space + "</ul>";
        }
        return match;
      });
      result = this.convertQuillLists(result);
      result = result.replace(/<strong>/gi, "<b>");
      result = result.replace(/<\/strong>/gi, "</b>");
      result = result.replace(/<em>/gi, "<i>");
      result = result.replace(/<\/em>/gi, "</i>");
      result = result.replace(/<p>/gi, "<div>");
      result = result.replace(/<\/p>/gi, "</div>");
      result = result.replace(/<div><\/div>/gi, "<div><br></div>");
      result = result.replace(/(<div><br><\/div>)+$/, "");
      result = result.trim();
      return result;
    }
    convertQuillLists(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString("<div>" + html + "</div>", "text/html");
      const container = doc.body.firstChild;
      const ols = container.querySelectorAll("ol");
      ols.forEach((ol) => {
        const items = ol.querySelectorAll("li");
        if (items.length > 0) {
          const firstItem = items[0];
          const listType = firstItem.getAttribute("data-list");
          if (listType === "bullet") {
            const ul = doc.createElement("ul");
            items.forEach((li) => {
              li.removeAttribute("data-list");
              ul.appendChild(li.cloneNode(true));
            });
            ol.parentNode?.replaceChild(ul, ol);
          } else {
            items.forEach((li) => {
              li.setAttribute("data-list", "ordered");
            });
          }
        }
      });
      return container.innerHTML;
    }
    htmlToPlainText(html) {
      if (!html) return "";
      let text = html;
      text = text.replace(/<br\s*\/?>/gi, "\n");
      text = text.replace(/<\/div>\s*<div>/gi, "\n");
      text = text.replace(/<\/(div|p|li)>/gi, "\n");
      text = text.replace(/<li[^>]*>/gi, "\u2022 ");
      text = text.replace(/<[^>]+>/g, "");
      text = text.replace(/&nbsp;/g, " ");
      text = text.replace(/&amp;/g, "&");
      text = text.replace(/&lt;/g, "<");
      text = text.replace(/&gt;/g, ">");
      text = text.replace(/&quot;/g, '"');
      text = text.replace(/&#39;/g, "'");
      text = text.replace(/\\n/g, "\n");
      text = text.replace(/\n{3,}/g, "\n\n");
      text = text.trim();
      return text;
    }
    showToast(type, title, message = "", duration = 5e3) {
      const icons = {
        error: "\u2715",
        success: "\u2713",
        warning: "\u26A0",
        info: "\u2139"
      };
      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">
                <div class="toast-title">${this.escapeHtml(title)}</div>
                ${message ? `<div class="toast-message">${this.escapeHtml(message)}</div>` : ""}
            </div>
            <button class="toast-close" aria-label="Close">\xD7</button>
        `;
      const closeBtn = toast.querySelector(".toast-close");
      closeBtn?.addEventListener("click", () => this.dismissToast(toast));
      this.toastContainer.appendChild(toast);
      if (duration > 0) {
        setTimeout(() => this.dismissToast(toast), duration);
      }
      return toast;
    }
    dismissToast(toast) {
      if (!toast || !toast.parentNode) return;
      toast.classList.add("toast-out");
      toast.addEventListener("animationend", () => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      });
    }
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
    highlightText(text, searchTerm) {
      if (!searchTerm || !text) return this.escapeHtml(text);
      const escaped = this.escapeHtml(text);
      const escapedTerm = this.escapeHtml(searchTerm);
      const regexSafe = escapedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${regexSafe})`, "gi");
      return escaped.replace(regex, "<mark>$1</mark>");
    }
    base64DecodeUtf8(base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder("utf-8").decode(bytes);
    }
    base64EncodeUtf8(str) {
      const bytes = new TextEncoder().encode(str);
      let binaryString = "";
      for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
      }
      return btoa(binaryString);
    }
    arrayBufferToBase64(buffer) {
      const bytes = new Uint8Array(buffer);
      let binaryString = "";
      for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
      }
      return btoa(binaryString);
    }
    /** Convert emojis to text representation for PDF export (fonts don't support emojis) */
    emojisToText(text) {
      const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{200D}]|[\u{FE0F}]|[\u{1FA00}-\u{1FAFF}]|[\u{E0000}-\u{E007F}]/gu;
      return text.replace(emojiRegex, (match) => {
        if (match === "\uFE0F" || match === "\u200D" || match.charCodeAt(0) >= 917504 && match.charCodeAt(0) <= 917631) {
          return "";
        }
        let textName = EMOJI_MAP[match];
        if (textName) {
          return textName;
        }
        textName = EMOJI_MAP[match + "\uFE0F"];
        if (textName) {
          return textName;
        }
        return "[emoji]";
      });
    }
    async saveBackup() {
      if (!this.data) return;
      try {
        this.data.dayEntries = this.entries;
        const jsonString = JSON.stringify(this.data);
        const base64Content = this.base64EncodeUtf8(jsonString);
        const zip = new JSZip();
        zip.file("backup.daylio", base64Content);
        for (const [path, content] of Object.entries(this.assets)) {
          zip.file(path, content);
        }
        const blob = await zip.generateAsync({
          type: "blob",
          compression: "STORE"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        a.download = `backup_${dateStr}.daylio`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.clearUnsavedChanges();
        this.showToast("success", "Backup Downloaded", "Your modified backup is ready to import into Daylio.");
      } catch (err) {
        this.showToast("error", "Failed to Save Backup", err.message);
      }
    }
    toggleExportMenu() {
      const isOpen = this.exportDropdown.classList.contains("open");
      if (isOpen) {
        this.closeExportMenu();
      } else {
        this.exportDropdown.classList.add("open");
        this.exportBtn.setAttribute("aria-expanded", "true");
      }
    }
    closeExportMenu() {
      this.exportDropdown.classList.remove("open");
      this.exportBtn.setAttribute("aria-expanded", "false");
    }
    exportCsv() {
      try {
        if (!this.entries || this.entries.length === 0) {
          this.showToast("warning", "No Entries", "Load a backup file first before exporting.");
          return;
        }
        const headers = ["Date", "Weekday", "Time", "Mood", "Mood Score", "Activities", "Activity Count", "Photos", "Title", "Note"];
        const rows = [headers];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const sortedEntries = [...this.entries].sort((a2, b) => {
          const dateA = new Date(a2.year, a2.month, a2.day, a2.hour, a2.minute);
          const dateB = new Date(b.year, b.month, b.day, b.hour, b.minute);
          return dateA.getTime() - dateB.getTime();
        });
        for (const entry of sortedEntries) {
          const date = `${entry.year}-${String(entry.month + 1).padStart(2, "0")}-${String(entry.day).padStart(2, "0")}`;
          const weekday = weekdays[new Date(entry.year, entry.month, entry.day).getDay()];
          const time = `${String(entry.hour).padStart(2, "0")}:${String(entry.minute).padStart(2, "0")}`;
          const mood = this.getMoodLabel(entry.mood);
          const moodGroupId = this.getMoodGroupId(entry.mood);
          const moodScore = String(6 - moodGroupId);
          const activityNames = this.getEntryTags(entry);
          const activities = activityNames.join(" | ");
          const activityCount = String(activityNames.length);
          const photoCount = String(entry.assets?.length || 0);
          const title = entry.note_title || "";
          const note = this.htmlToPlainText(entry.note || "");
          rows.push([date, weekday, time, mood, moodScore, activities, activityCount, photoCount, title, note]);
        }
        const csv = rows.map(
          (row) => row.map((cell) => this.escapeCsvField(cell)).join(",")
        ).join("\n");
        const bom = "\uFEFF";
        const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        a.download = `daylio_export_${dateStr}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast("success", "CSV Exported", `Exported ${this.entries.length} entries to CSV.`);
      } catch (err) {
        this.showToast("error", "Failed to Export CSV", err.message);
        console.error("CSV export error:", err);
      }
    }
    escapeCsvField(field) {
      if (field === null || field === void 0) return "";
      const str = String(field);
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }
    exportJson() {
      try {
        if (!this.data) {
          this.showToast("warning", "No Data", "Load a backup file first before exporting.");
          return;
        }
        const jsonString = JSON.stringify(this.data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        a.download = `daylio_export_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast("success", "JSON Exported", `Exported ${this.entries.length} entries to JSON.`);
      } catch (err) {
        this.showToast("error", "Failed to Export JSON", err.message);
        console.error("JSON export error:", err);
      }
    }
    exportMarkdown() {
      try {
        if (!this.entries || this.entries.length === 0) {
          this.showToast("warning", "No Entries", "Load a backup file first before exporting.");
          return;
        }
        const lines = [];
        lines.push("# Daylio Journal Export");
        lines.push("");
        const sortedEntries = [...this.entries].sort((a2, b) => b.datetime - a2.datetime);
        let currentYear = -1;
        let currentMonth = -1;
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        for (const entry of sortedEntries) {
          if (entry.year !== currentYear) {
            currentYear = entry.year;
            currentMonth = -1;
            lines.push(`## ${currentYear}`);
            lines.push("");
          }
          if (entry.month !== currentMonth) {
            currentMonth = entry.month;
            lines.push(`### ${months[currentMonth]}`);
            lines.push("");
          }
          const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const date = new Date(entry.year, entry.month, entry.day);
          const weekday = weekdays[date.getDay()];
          const time = `${String(entry.hour).padStart(2, "0")}:${String(entry.minute).padStart(2, "0")}`;
          const mood = this.getMoodLabel(entry.mood);
          lines.push(`#### ${months[entry.month]} ${entry.day}, ${weekday} at ${time}`);
          lines.push("");
          lines.push(`**Mood:** ${mood}`);
          const activities = this.getEntryTags(entry);
          if (activities.length > 0) {
            lines.push(`**Activities:** ${activities.join(", ")}`);
          }
          const photoCount = entry.assets?.length || 0;
          if (photoCount > 0) {
            lines.push(`**Photos:** ${photoCount}`);
          }
          lines.push("");
          if (entry.note_title?.trim()) {
            lines.push(`**${entry.note_title.trim()}**`);
            lines.push("");
          }
          if (entry.note) {
            const plainText = this.htmlToPlainText(entry.note);
            if (plainText) {
              lines.push(plainText);
              lines.push("");
            }
          }
          lines.push("---");
          lines.push("");
        }
        const markdown = lines.join("\n");
        const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        a.download = `daylio_export_${dateStr}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast("success", "Markdown Exported", `Exported ${this.entries.length} entries to Markdown.`);
      } catch (err) {
        this.showToast("error", "Failed to Export Markdown", err.message);
        console.error("Markdown export error:", err);
      }
    }
    exportPdf() {
      try {
        if (!this.entries || this.entries.length === 0) {
          this.showToast("warning", "No Entries", "Load a backup file first before exporting.");
          return;
        }
        const sortedEntries = [...this.entries].sort((a, b) => b.datetime - a.datetime);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const content = [];
        content.push({ text: "Daylio Journal", style: "title" });
        content.push({ text: `Exported on ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, style: "subtitle", margin: [0, 0, 0, 15] });
        let currentYear = -1;
        let currentMonth = -1;
        for (const entry of sortedEntries) {
          if (entry.year !== currentYear) {
            currentYear = entry.year;
            currentMonth = -1;
            content.push({ text: String(currentYear), style: "yearHeader", margin: [0, 10, 0, 5] });
          }
          if (entry.month !== currentMonth) {
            currentMonth = entry.month;
            content.push({ text: months[currentMonth], style: "monthHeader", margin: [0, 5, 0, 5] });
          }
          const date = new Date(entry.year, entry.month, entry.day);
          const weekday = weekdays[date.getDay()];
          const time = `${String(entry.hour).padStart(2, "0")}:${String(entry.minute).padStart(2, "0")}`;
          const mood = this.emojisToText(this.getMoodLabel(entry.mood));
          content.push({
            columns: [
              { text: `${months[entry.month]} ${entry.day}, ${weekday}`, style: "entryDate", width: "auto" },
              { text: `${time} \u2022 ${mood}`, style: "entryMeta", width: "*", margin: [10, 0, 0, 0] }
            ],
            margin: [0, 3, 0, 2]
          });
          const activities = this.getEntryTags(entry);
          if (activities.length > 0) {
            content.push({ text: this.emojisToText(activities.join(", ")), style: "activities", margin: [0, 0, 0, 2] });
          }
          if (entry.note_title?.trim()) {
            content.push({ text: this.emojisToText(entry.note_title.trim()), style: "noteTitle", margin: [0, 2, 0, 2] });
          }
          if (entry.note) {
            const plainText = this.htmlToPlainText(entry.note);
            if (plainText) {
              content.push({ text: this.emojisToText(plainText), style: "noteContent", margin: [0, 0, 0, 3] });
            }
          }
          content.push({
            canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: "#cccccc" }],
            margin: [0, 5, 0, 5]
          });
        }
        const docDefinition = {
          content,
          styles: {
            title: { fontSize: 24, bold: true },
            subtitle: { fontSize: 10, color: "#666666" },
            yearHeader: { fontSize: 18, bold: true },
            monthHeader: { fontSize: 14, bold: true, color: "#505050" },
            entryDate: { fontSize: 11, bold: true },
            entryMeta: { fontSize: 11, color: "#666666" },
            activities: { fontSize: 9, color: "#505050" },
            noteTitle: { fontSize: 10, bold: true },
            noteContent: { fontSize: 9 }
          },
          defaultStyle: {
            font: "Roboto"
          },
          pageMargins: [40, 40, 40, 40]
        };
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        pdfMake.createPdf(docDefinition).download(`daylio_export_${dateStr}.pdf`);
        this.showToast("success", "PDF Exported", `Exported ${this.entries.length} entries to PDF.`);
      } catch (err) {
        this.showToast("error", "Failed to Export PDF", err.message);
        console.error("PDF export error:", err);
      }
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    new DaylioScribe();
  });
})();
//# sourceMappingURL=app.js.map
