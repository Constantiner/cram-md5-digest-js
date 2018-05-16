import { cramMd5DigestBase64, cramMd5Digest } from "../src/cram-md5-digest";

describe("cramMd5Digest", () => {
	describe("cramMd5DigestBase64 without padding", () => {
		it("Base64 digest without padding should be calculated right", () => {
			expect(
				cramMd5DigestBase64(
					"Превед",
					"E61F8DACCF78E6D810D2D28EADD0A5DB"
				)
			).toEqual("ZDYxODU1ODhjNGVhODMwNzhkNmFiN2MwYmNlZGU0NTA");
			expect(
				cramMd5DigestBase64(
					"(4_O)rt1BtMhs^boQIFVGN4^@U6m-5j@i",
					"(1C6hqgm2siyHl3*36#t17c/7h-7h!d!sLoyt8$vnoe3K5to7#^kcYx8$62b0w/Dt&lNs"
				)
			).toEqual("NDNlYTVhOTljNTZiYjI1ZmRlODE2NDNlZDM3OWIyZmE");
			expect(
				cramMd5DigestBase64("V48f2u6*579hF(U03sRf(-3Y4MgMzgq42tw5DR1t)T", "t(2XyM012Wds!Bq9^m/sdulnx1nd3c0a4)26(2bDPy5")
			).toEqual("ODM5ZGY1NzQ5ZWFiY2NhMmQ4YmZjZDg3NzU5NzIxYzA");
			expect(cramMd5DigestBase64("$kt3/00752c4dgav66s97l4(B)y21", "905u3^j!3x)sjb26c2$PE54)x&m^@/r65w=-Vt")).toEqual(
				"NzIyMDYyMmEzMTcyNmEyZTYyYjU1MmI4YWE1NmZjMmM"
			);
			expect(
				cramMd5DigestBase64(
					"#FiS7Ri)7/S*0n0OU5F617dh5xe$rF1pFo5i9rxrGs24D316#@0Tvv=#(&p",
					"=-p2K7b5713***k362@07f(Uwh_L24icaR42c2b"
				)
			).toEqual("M2EyYWVmMzlhMWM3YmU5NTM4MGQ4ODRjMDVmZTBiNGQ");
			expect(cramMd5DigestBase64("YC+HxEC8m40c@+g2_g67mV8!ve2-6", "LS8NiuZGxtQ49#gU9f(5aSWl6cT28_(-&1v")).toEqual(
				"ZmU5ODRlYmY0OTZkOGVmN2M0NjZkNGM1M2U2NmRmYTA"
			);
			expect(
				cramMd5DigestBase64("a5y6980m$8@Pds933I1e^C21@j0+7q6s56tl", "z25YGd5pejI384Tg8@950203XNm0Kk2(0/p4TKBh")
			).toEqual("YjhlNDRmMmY1ZmRhNDE1MjNlNmI4ZDI0OGQ2NGY3NGY");
			expect(
				cramMd5DigestBase64(
					"cs6J311q8vr3gqQYdr-579Cyd19(u68(4(6(P4",
					"u51p0Pt4yCtdyx4(EIb4e1W0/EYtxMO-o$3_qP4XbVGF(w4e"
				)
			).toEqual("ODA0NmJjMTE0M2RmOTM0YzljMmE5ZmI5NDYwNjk2OGI");
			expect(
				cramMd5DigestBase64(
					"Mq84T7Mv$@XBgbC5&t_1r^P&qk$83u",
					"(5&#24T8p585sWuO6Yw8I5o/&#Ly&8n52Wf7nk56Mny1rY5@06kAJ83241d4"
				)
			).toEqual("YzJmYjk4MzVjZTg5MTZlYTVhOWRiYWZkZjE4MWIyNTE");
			expect(cramMd5DigestBase64("hFPNx3x8q^09/y_a8gI73", "$Iw5FHR-dJa6^=#PwhqtF7$Uy=2fmsPemru0qj150")).toEqual(
				"MDIxYzc4NjNmMDZhM2E1Zjk0ZDg5Njc3YWZjNDNkY2E"
			);
			expect(
				cramMd5DigestBase64("Th_8l2KfF34y29u1eW7w3$ck8Ooq8uwWpRq1rz/^hC12A55f1X$J0", "HS58)TQYz_4f6z2_#_++s5c3$16!2pY")
			).toEqual("ZTE4NWFkNTc5ODZmN2NiZDMzZjI2N2IwMzg1MzQzZGY");
			expect(cramMd5DigestBase64("*ismt933)B3twrf5^h3327n27_Xj-3Q-$tv&2E7", "l&&lI1xy7313q6")).toEqual(
				"N2YwMjhhMDg1ZTlhMTlhMTRhZGY4YTUzZjMzNWIwMTc"
			);
			expect(
				cramMd5DigestBase64("$+Si7Q75-m#5(6r-L5t7zyXdlD7lQ6k5e(81478", "nUHoz*cXv1b55u23Zd4u877i20u@m7SBSdMkyVd5")
			).toEqual("MzMxZjg2NWNhM2U5ODVmOWJhNTVhNTFiMmE3YmMzYjk");
			expect(cramMd5DigestBase64("th7)(fx2634l5a5", "b4x7b-4ha7B9nqz5RI9v904/5b6Q3&0dx)H#pn14$k_5usF4&)3lmo")).toEqual(
				"MDc5YWFhYzY3MTA1OTI3ZjM0Mzg4ZGJhYWFiMzVlZDU"
			);
			expect(
				cramMd5DigestBase64(
					"Vf@hLS)70O/Rg813f0ue4p88y6d39c93F-568WKryJ1lXbaf=41dLk7h-35",
					"()8jz7fvvHrgPlf2B885&kA25BH6$4Y!*36r0*707e1j18u"
				)
			).toEqual("ZjMwZmNkNzFmMjhkZWI2ODM5YmJmYjM2YTU1YmZiYjc");
			expect(
				cramMd5DigestBase64(
					"i5RW-57BleV1W5ms6ju74_FllT92KTBmc",
					"doQ*2y3hm_Nm)Ja87NPjivqzj@pBX(HD9cn0QzQ1^+vs1nwVGoSs56u42F9OJeq2"
				)
			).toEqual("YWMwOTlkMTE3OWZmMGQwMTgwZjA0MzZhMDc0ODdiNDI");
			expect(cramMd5DigestBase64("7apdH6P5-oAR43W3r7s5u1WhV", "V&f2b$*soHNpD61X=Rh")).toEqual(
				"YzE0ZWY1MjNjNzgzZjk0NDFkNzJjZTIxYmJlNjJkOGQ"
			);
			expect(
				cramMd5DigestBase64("/342mL1ex8d@e!F887x8-m6=Iexfp^99#!0b2g1J8", "nxb6j062o6q1ql4SjeE0m7iiNrd2kt^ibg6=hz3fQi1")
			).toEqual("YzkxYTIyMTNhNjZiYzI0YTNhNTU2MzY3OGU2MmM1N2Y");
			expect(
				cramMd5DigestBase64("0hdE3hw(7SNa27c9*6K+45_i36dG3cb5p5oFwh_i5G72LrY47sgt1Z", "c(xo1S3j0P7dn+8X1&ip_q5#")
			).toEqual("YzIyYTNkNGJiOWM0ZTRjOThlNzA5ODE3MWE5MjVmOWI");
			expect(cramMd5DigestBase64("*", "1qtd6OhY6mHtyypv$elfw5+s)y27rXMmPN")).toEqual(
				"ZDc2YjQ3YzY4NzQ3M2QxYzgwOWRjODJmYWYzMzRiZGQ"
			);
			expect(cramMd5DigestBase64("83t)", "Ie987ALLt456!/i76e$21u6Xq_@L45/2F/ssjhxf1xgYfaG9ql#RK7(tuCHns43e")).toEqual(
				"ZmNhZGU1MmUzZTIxZGEzZjI4MDIwMTk5ODNlY2U2OTE"
			);
			expect(cramMd5DigestBase64("Q)Q2^!ox2oGsjK4)0*HC-9$tI&m8/X4$q1QTzgGlKh5nfU$7(r", "r6474@g@-")).toEqual(
				"NmNjNjQzYjE0MzQxYTRmMDAyYjEzNDU3MGFiMTdlMTQ"
			);
			expect(cramMd5DigestBase64("o8s05@*q/Hi87f&$n7@j8b377XpOvf2f", "SJH+p!w96jP921+yePy-@i3O$mb")).toEqual(
				"N2M2NTMzMmE1YjVhYmM3OTgwM2JmODA5ZDU3Yjc5NDE"
			);
			expect(cramMd5DigestBase64("voxjx70j131lv9g645j6Znx8535l5Xb1nkl6CF0489lE2Gc^b*H&F5jn", "1$G15/iw")).toEqual(
				"ODRmOWUzMjc0MDU1YTg3ZGI4NTQ1YzQ3MjEwMmQ1NmY"
			);
			expect(
				cramMd5DigestBase64("@j-i442juRmgGq8-dH_Ydb", "3bYzxe-(ixdHo(3LS3qp-16Mcyc4mgJ7aBY2C=53Geyy)!ble#W5$!T744")
			).toEqual("YWE5ZmZkYWMwNzk0MzI0Mjc1MjE2NmU4YzViZWQ4YTg");
			expect(cramMd5DigestBase64("y", "4Wk!7")).toEqual("ZTA2YWNjNTU0NzQ1MWIzZGE1ODE2ZjIyMDAzZWQ1Mjk");
			expect(
				cramMd5DigestBase64(
					"m@qe23I)0x!)!g7(kt56w4-O-*5)e83c--SyQell*m$s3L!bLd#Ilz",
					"f4*nnmh2+_98K818sO1kt#wu4UUbv1frNfkg06t62@71iLt$n"
				)
			).toEqual("NmE1NmY2YzEzNWQ3NDlkZGU2ZmU1MjFlZThlOWU4N2Y");
			expect(
				cramMd5DigestBase64("0Y7dDxxE7425Gd2dMp5927*S8jE7$C*U(hwkd_qF3&Q&q", "1(Qs6xfgM$M4)Uu8$7gHw/1pi&S7s1sT^um")
			).toEqual("ZjVjZDY2YzU0OTIxYTA4ZTQzYTNmNjg5N2Y3ZjU0ZGM");
			expect(
				cramMd5DigestBase64(
					"nl#l910wr7s+2rn4+bAe)o(!N=sH2W2g3l8^#D!TU8ak^8*q)j8en2",
					"mrB1XAzz14iO9&8(1^jr8tj1sT3U/(9#0Rrf"
				)
			).toEqual("YmYyMTkyMzFjODQxMWUwNjkyY2QyODNlY2UwMzkxMTQ");
			expect(
				cramMd5DigestBase64("xF6v2@87!2732Q$351w55_/3GQ2h2gORwcpK!&3dx", "5-@^4kM891@qtU^2wjq*BmGU1h1!DSal9yP5I7uMs")
			).toEqual("YmI5YTkxMTI1OWJlYjU4ZTViN2E3M2Q1NWM4YWJlM2U");
			expect(
				cramMd5DigestBase64("lf^_d)-d)81RFj21435f", "yt(*+H0s755tN32f(u@86uX0o7y3ARLq28D@K3_2q&50l))w3L)mthLgvi")
			).toEqual("Zjk4YmIzYmM1NmE5YzE1NTYzYTI3MzMyODEwNmFmODI");
			expect(
				cramMd5DigestBase64(
					"ZTIxNGE4MWNkfsZjgzMzI2OTZjMzE2ZDU1OWMxMDIzNzEyYTM2NjRhNTIZTIxNGE4MWNkM2ZiNzM4ZGZkYWQyN2MxOWE3MTM1MzQ",
					"E61F8DACCF78E6D810D2D28EADD0A5DB"
				)
			).toEqual("MjlmN2I2NTc1OTVjNThkOTE1M2U3MTc4NDhhOTQ2NzY");
		});
	});
	describe("cramMd5DigestBase64 with padding", () => {
		it("Base64 digest with padding should be calculated right", () => {
			expect(
				cramMd5DigestBase64(
					"Превед",
					"E61F8DACCF78E6D810D2D28EADD0A5DB",
					true
				)
			).toEqual("ZDYxODU1ODhjNGVhODMwNzhkNmFiN2MwYmNlZGU0NTA=");
			expect(
				cramMd5DigestBase64(
					"(4_O)rt1BtMhs^boQIFVGN4^@U6m-5j@i",
					"(1C6hqgm2siyHl3*36#t17c/7h-7h!d!sLoyt8$vnoe3K5to7#^kcYx8$62b0w/Dt&lNs",
					true
				)
			).toEqual("NDNlYTVhOTljNTZiYjI1ZmRlODE2NDNlZDM3OWIyZmE=");
			expect(
				cramMd5DigestBase64(
					"V48f2u6*579hF(U03sRf(-3Y4MgMzgq42tw5DR1t)T",
					"t(2XyM012Wds!Bq9^m/sdulnx1nd3c0a4)26(2bDPy5",
					true
				)
			).toEqual("ODM5ZGY1NzQ5ZWFiY2NhMmQ4YmZjZDg3NzU5NzIxYzA=");
			expect(
				cramMd5DigestBase64("$kt3/00752c4dgav66s97l4(B)y21", "905u3^j!3x)sjb26c2$PE54)x&m^@/r65w=-Vt", true)
			).toEqual("NzIyMDYyMmEzMTcyNmEyZTYyYjU1MmI4YWE1NmZjMmM=");
			expect(
				cramMd5DigestBase64(
					"#FiS7Ri)7/S*0n0OU5F617dh5xe$rF1pFo5i9rxrGs24D316#@0Tvv=#(&p",
					"=-p2K7b5713***k362@07f(Uwh_L24icaR42c2b",
					true
				)
			).toEqual("M2EyYWVmMzlhMWM3YmU5NTM4MGQ4ODRjMDVmZTBiNGQ=");
			expect(cramMd5DigestBase64("YC+HxEC8m40c@+g2_g67mV8!ve2-6", "LS8NiuZGxtQ49#gU9f(5aSWl6cT28_(-&1v", true)).toEqual(
				"ZmU5ODRlYmY0OTZkOGVmN2M0NjZkNGM1M2U2NmRmYTA="
			);
			expect(
				cramMd5DigestBase64("a5y6980m$8@Pds933I1e^C21@j0+7q6s56tl", "z25YGd5pejI384Tg8@950203XNm0Kk2(0/p4TKBh", true)
			).toEqual("YjhlNDRmMmY1ZmRhNDE1MjNlNmI4ZDI0OGQ2NGY3NGY=");
			expect(
				cramMd5DigestBase64(
					"cs6J311q8vr3gqQYdr-579Cyd19(u68(4(6(P4",
					"u51p0Pt4yCtdyx4(EIb4e1W0/EYtxMO-o$3_qP4XbVGF(w4e",
					true
				)
			).toEqual("ODA0NmJjMTE0M2RmOTM0YzljMmE5ZmI5NDYwNjk2OGI=");
			expect(
				cramMd5DigestBase64(
					"Mq84T7Mv$@XBgbC5&t_1r^P&qk$83u",
					"(5&#24T8p585sWuO6Yw8I5o/&#Ly&8n52Wf7nk56Mny1rY5@06kAJ83241d4",
					true
				)
			).toEqual("YzJmYjk4MzVjZTg5MTZlYTVhOWRiYWZkZjE4MWIyNTE=");
			expect(cramMd5DigestBase64("hFPNx3x8q^09/y_a8gI73", "$Iw5FHR-dJa6^=#PwhqtF7$Uy=2fmsPemru0qj150", true)).toEqual(
				"MDIxYzc4NjNmMDZhM2E1Zjk0ZDg5Njc3YWZjNDNkY2E="
			);
			expect(
				cramMd5DigestBase64(
					"Th_8l2KfF34y29u1eW7w3$ck8Ooq8uwWpRq1rz/^hC12A55f1X$J0",
					"HS58)TQYz_4f6z2_#_++s5c3$16!2pY",
					true
				)
			).toEqual("ZTE4NWFkNTc5ODZmN2NiZDMzZjI2N2IwMzg1MzQzZGY=");
			expect(cramMd5DigestBase64("*ismt933)B3twrf5^h3327n27_Xj-3Q-$tv&2E7", "l&&lI1xy7313q6", true)).toEqual(
				"N2YwMjhhMDg1ZTlhMTlhMTRhZGY4YTUzZjMzNWIwMTc="
			);
			expect(
				cramMd5DigestBase64("$+Si7Q75-m#5(6r-L5t7zyXdlD7lQ6k5e(81478", "nUHoz*cXv1b55u23Zd4u877i20u@m7SBSdMkyVd5", true)
			).toEqual("MzMxZjg2NWNhM2U5ODVmOWJhNTVhNTFiMmE3YmMzYjk=");
			expect(
				cramMd5DigestBase64("th7)(fx2634l5a5", "b4x7b-4ha7B9nqz5RI9v904/5b6Q3&0dx)H#pn14$k_5usF4&)3lmo", true)
			).toEqual("MDc5YWFhYzY3MTA1OTI3ZjM0Mzg4ZGJhYWFiMzVlZDU=");
			expect(
				cramMd5DigestBase64(
					"Vf@hLS)70O/Rg813f0ue4p88y6d39c93F-568WKryJ1lXbaf=41dLk7h-35",
					"()8jz7fvvHrgPlf2B885&kA25BH6$4Y!*36r0*707e1j18u",
					true
				)
			).toEqual("ZjMwZmNkNzFmMjhkZWI2ODM5YmJmYjM2YTU1YmZiYjc=");
			expect(
				cramMd5DigestBase64(
					"i5RW-57BleV1W5ms6ju74_FllT92KTBmc",
					"doQ*2y3hm_Nm)Ja87NPjivqzj@pBX(HD9cn0QzQ1^+vs1nwVGoSs56u42F9OJeq2",
					true
				)
			).toEqual("YWMwOTlkMTE3OWZmMGQwMTgwZjA0MzZhMDc0ODdiNDI=");
			expect(cramMd5DigestBase64("7apdH6P5-oAR43W3r7s5u1WhV", "V&f2b$*soHNpD61X=Rh", true)).toEqual(
				"YzE0ZWY1MjNjNzgzZjk0NDFkNzJjZTIxYmJlNjJkOGQ="
			);
			expect(
				cramMd5DigestBase64(
					"/342mL1ex8d@e!F887x8-m6=Iexfp^99#!0b2g1J8",
					"nxb6j062o6q1ql4SjeE0m7iiNrd2kt^ibg6=hz3fQi1",
					true
				)
			).toEqual("YzkxYTIyMTNhNjZiYzI0YTNhNTU2MzY3OGU2MmM1N2Y=");
			expect(
				cramMd5DigestBase64("0hdE3hw(7SNa27c9*6K+45_i36dG3cb5p5oFwh_i5G72LrY47sgt1Z", "c(xo1S3j0P7dn+8X1&ip_q5#", true)
			).toEqual("YzIyYTNkNGJiOWM0ZTRjOThlNzA5ODE3MWE5MjVmOWI=");
			expect(cramMd5DigestBase64("*", "1qtd6OhY6mHtyypv$elfw5+s)y27rXMmPN", true)).toEqual(
				"ZDc2YjQ3YzY4NzQ3M2QxYzgwOWRjODJmYWYzMzRiZGQ="
			);
			expect(
				cramMd5DigestBase64("83t)", "Ie987ALLt456!/i76e$21u6Xq_@L45/2F/ssjhxf1xgYfaG9ql#RK7(tuCHns43e", true)
			).toEqual("ZmNhZGU1MmUzZTIxZGEzZjI4MDIwMTk5ODNlY2U2OTE=");
			expect(cramMd5DigestBase64("Q)Q2^!ox2oGsjK4)0*HC-9$tI&m8/X4$q1QTzgGlKh5nfU$7(r", "r6474@g@-", true)).toEqual(
				"NmNjNjQzYjE0MzQxYTRmMDAyYjEzNDU3MGFiMTdlMTQ="
			);
			expect(cramMd5DigestBase64("o8s05@*q/Hi87f&$n7@j8b377XpOvf2f", "SJH+p!w96jP921+yePy-@i3O$mb", true)).toEqual(
				"N2M2NTMzMmE1YjVhYmM3OTgwM2JmODA5ZDU3Yjc5NDE="
			);
			expect(cramMd5DigestBase64("voxjx70j131lv9g645j6Znx8535l5Xb1nkl6CF0489lE2Gc^b*H&F5jn", "1$G15/iw", true)).toEqual(
				"ODRmOWUzMjc0MDU1YTg3ZGI4NTQ1YzQ3MjEwMmQ1NmY="
			);
			expect(
				cramMd5DigestBase64(
					"@j-i442juRmgGq8-dH_Ydb",
					"3bYzxe-(ixdHo(3LS3qp-16Mcyc4mgJ7aBY2C=53Geyy)!ble#W5$!T744",
					true
				)
			).toEqual("YWE5ZmZkYWMwNzk0MzI0Mjc1MjE2NmU4YzViZWQ4YTg=");
			expect(cramMd5DigestBase64("y", "4Wk!7", true)).toEqual("ZTA2YWNjNTU0NzQ1MWIzZGE1ODE2ZjIyMDAzZWQ1Mjk=");
			expect(
				cramMd5DigestBase64(
					"m@qe23I)0x!)!g7(kt56w4-O-*5)e83c--SyQell*m$s3L!bLd#Ilz",
					"f4*nnmh2+_98K818sO1kt#wu4UUbv1frNfkg06t62@71iLt$n",
					true
				)
			).toEqual("NmE1NmY2YzEzNWQ3NDlkZGU2ZmU1MjFlZThlOWU4N2Y=");
			expect(
				cramMd5DigestBase64(
					"0Y7dDxxE7425Gd2dMp5927*S8jE7$C*U(hwkd_qF3&Q&q",
					"1(Qs6xfgM$M4)Uu8$7gHw/1pi&S7s1sT^um",
					true
				)
			).toEqual("ZjVjZDY2YzU0OTIxYTA4ZTQzYTNmNjg5N2Y3ZjU0ZGM=");
			expect(
				cramMd5DigestBase64(
					"nl#l910wr7s+2rn4+bAe)o(!N=sH2W2g3l8^#D!TU8ak^8*q)j8en2",
					"mrB1XAzz14iO9&8(1^jr8tj1sT3U/(9#0Rrf",
					true
				)
			).toEqual("YmYyMTkyMzFjODQxMWUwNjkyY2QyODNlY2UwMzkxMTQ=");
			expect(
				cramMd5DigestBase64(
					"xF6v2@87!2732Q$351w55_/3GQ2h2gORwcpK!&3dx",
					"5-@^4kM891@qtU^2wjq*BmGU1h1!DSal9yP5I7uMs",
					true
				)
			).toEqual("YmI5YTkxMTI1OWJlYjU4ZTViN2E3M2Q1NWM4YWJlM2U=");
			expect(
				cramMd5DigestBase64("lf^_d)-d)81RFj21435f", "yt(*+H0s755tN32f(u@86uX0o7y3ARLq28D@K3_2q&50l))w3L)mthLgvi", true)
			).toEqual("Zjk4YmIzYmM1NmE5YzE1NTYzYTI3MzMyODEwNmFmODI=");
			expect(
				cramMd5DigestBase64(
					"ZTIxNGE4MWNkfsZjgzMzI2OTZjMzE2ZDU1OWMxMDIzNzEyYTM2NjRhNTIZTIxNGE4MWNkM2ZiNzM4ZGZkYWQyN2MxOWE3MTM1MzQ",
					"E61F8DACCF78E6D810D2D28EADD0A5DB",
					true
				)
			).toEqual("MjlmN2I2NTc1OTVjNThkOTE1M2U3MTc4NDhhOTQ2NzY=");
		});
	});
	describe("cramMd5Digest", () => {
		it("cramMd5Digest should be calculated right", () => {
			expect(
				cramMd5Digest(
					"Превед",
					"E61F8DACCF78E6D810D2D28EADD0A5DB"
				)
			).toEqual("d6185588c4ea83078d6ab7c0bcede450");
			expect(
				cramMd5Digest(
					"(4_O)rt1BtMhs^boQIFVGN4^@U6m-5j@i",
					"(1C6hqgm2siyHl3*36#t17c/7h-7h!d!sLoyt8$vnoe3K5to7#^kcYx8$62b0w/Dt&lNs"
				)
			).toEqual("43ea5a99c56bb25fde81643ed379b2fa");
			expect(
				cramMd5Digest("V48f2u6*579hF(U03sRf(-3Y4MgMzgq42tw5DR1t)T", "t(2XyM012Wds!Bq9^m/sdulnx1nd3c0a4)26(2bDPy5")
			).toEqual("839df5749eabcca2d8bfcd87759721c0");
			expect(cramMd5Digest("$kt3/00752c4dgav66s97l4(B)y21", "905u3^j!3x)sjb26c2$PE54)x&m^@/r65w=-Vt")).toEqual(
				"7220622a31726a2e62b552b8aa56fc2c"
			);
			expect(
				cramMd5Digest(
					"#FiS7Ri)7/S*0n0OU5F617dh5xe$rF1pFo5i9rxrGs24D316#@0Tvv=#(&p",
					"=-p2K7b5713***k362@07f(Uwh_L24icaR42c2b"
				)
			).toEqual("3a2aef39a1c7be95380d884c05fe0b4d");
			expect(cramMd5Digest("YC+HxEC8m40c@+g2_g67mV8!ve2-6", "LS8NiuZGxtQ49#gU9f(5aSWl6cT28_(-&1v")).toEqual(
				"fe984ebf496d8ef7c466d4c53e66dfa0"
			);
			expect(cramMd5Digest("a5y6980m$8@Pds933I1e^C21@j0+7q6s56tl", "z25YGd5pejI384Tg8@950203XNm0Kk2(0/p4TKBh")).toEqual(
				"b8e44f2f5fda41523e6b8d248d64f74f"
			);
			expect(
				cramMd5Digest("cs6J311q8vr3gqQYdr-579Cyd19(u68(4(6(P4", "u51p0Pt4yCtdyx4(EIb4e1W0/EYtxMO-o$3_qP4XbVGF(w4e")
			).toEqual("8046bc1143df934c9c2a9fb94606968b");
			expect(
				cramMd5Digest("Mq84T7Mv$@XBgbC5&t_1r^P&qk$83u", "(5&#24T8p585sWuO6Yw8I5o/&#Ly&8n52Wf7nk56Mny1rY5@06kAJ83241d4")
			).toEqual("c2fb9835ce8916ea5a9dbafdf181b251");
			expect(cramMd5Digest("hFPNx3x8q^09/y_a8gI73", "$Iw5FHR-dJa6^=#PwhqtF7$Uy=2fmsPemru0qj150")).toEqual(
				"021c7863f06a3a5f94d89677afc43dca"
			);
			expect(
				cramMd5Digest("Th_8l2KfF34y29u1eW7w3$ck8Ooq8uwWpRq1rz/^hC12A55f1X$J0", "HS58)TQYz_4f6z2_#_++s5c3$16!2pY")
			).toEqual("e185ad57986f7cbd33f267b0385343df");
			expect(cramMd5Digest("*ismt933)B3twrf5^h3327n27_Xj-3Q-$tv&2E7", "l&&lI1xy7313q6")).toEqual(
				"7f028a085e9a19a14adf8a53f335b017"
			);
			expect(
				cramMd5Digest("$+Si7Q75-m#5(6r-L5t7zyXdlD7lQ6k5e(81478", "nUHoz*cXv1b55u23Zd4u877i20u@m7SBSdMkyVd5")
			).toEqual("331f865ca3e985f9ba55a51b2a7bc3b9");
			expect(cramMd5Digest("th7)(fx2634l5a5", "b4x7b-4ha7B9nqz5RI9v904/5b6Q3&0dx)H#pn14$k_5usF4&)3lmo")).toEqual(
				"079aaac67105927f34388dbaaab35ed5"
			);
			expect(
				cramMd5Digest(
					"Vf@hLS)70O/Rg813f0ue4p88y6d39c93F-568WKryJ1lXbaf=41dLk7h-35",
					"()8jz7fvvHrgPlf2B885&kA25BH6$4Y!*36r0*707e1j18u"
				)
			).toEqual("f30fcd71f28deb6839bbfb36a55bfbb7");
			expect(
				cramMd5Digest(
					"i5RW-57BleV1W5ms6ju74_FllT92KTBmc",
					"doQ*2y3hm_Nm)Ja87NPjivqzj@pBX(HD9cn0QzQ1^+vs1nwVGoSs56u42F9OJeq2"
				)
			).toEqual("ac099d1179ff0d0180f0436a07487b42");
			expect(cramMd5Digest("7apdH6P5-oAR43W3r7s5u1WhV", "V&f2b$*soHNpD61X=Rh")).toEqual(
				"c14ef523c783f9441d72ce21bbe62d8d"
			);
			expect(
				cramMd5Digest("/342mL1ex8d@e!F887x8-m6=Iexfp^99#!0b2g1J8", "nxb6j062o6q1ql4SjeE0m7iiNrd2kt^ibg6=hz3fQi1")
			).toEqual("c91a2213a66bc24a3a5563678e62c57f");
			expect(
				cramMd5Digest("0hdE3hw(7SNa27c9*6K+45_i36dG3cb5p5oFwh_i5G72LrY47sgt1Z", "c(xo1S3j0P7dn+8X1&ip_q5#")
			).toEqual("c22a3d4bb9c4e4c98e7098171a925f9b");
			expect(cramMd5Digest("*", "1qtd6OhY6mHtyypv$elfw5+s)y27rXMmPN")).toEqual("d76b47c687473d1c809dc82faf334bdd");
			expect(cramMd5Digest("83t)", "Ie987ALLt456!/i76e$21u6Xq_@L45/2F/ssjhxf1xgYfaG9ql#RK7(tuCHns43e")).toEqual(
				"fcade52e3e21da3f2802019983ece691"
			);
			expect(cramMd5Digest("Q)Q2^!ox2oGsjK4)0*HC-9$tI&m8/X4$q1QTzgGlKh5nfU$7(r", "r6474@g@-")).toEqual(
				"6cc643b14341a4f002b134570ab17e14"
			);
			expect(cramMd5Digest("o8s05@*q/Hi87f&$n7@j8b377XpOvf2f", "SJH+p!w96jP921+yePy-@i3O$mb")).toEqual(
				"7c65332a5b5abc79803bf809d57b7941"
			);
			expect(cramMd5Digest("voxjx70j131lv9g645j6Znx8535l5Xb1nkl6CF0489lE2Gc^b*H&F5jn", "1$G15/iw")).toEqual(
				"84f9e3274055a87db8545c472102d56f"
			);
			expect(
				cramMd5Digest("@j-i442juRmgGq8-dH_Ydb", "3bYzxe-(ixdHo(3LS3qp-16Mcyc4mgJ7aBY2C=53Geyy)!ble#W5$!T744")
			).toEqual("aa9ffdac07943242752166e8c5bed8a8");
			expect(cramMd5Digest("y", "4Wk!7")).toEqual("e06acc5547451b3da5816f22003ed529");
			expect(
				cramMd5Digest(
					"m@qe23I)0x!)!g7(kt56w4-O-*5)e83c--SyQell*m$s3L!bLd#Ilz",
					"f4*nnmh2+_98K818sO1kt#wu4UUbv1frNfkg06t62@71iLt$n"
				)
			).toEqual("6a56f6c135d749dde6fe521ee8e9e87f");
			expect(
				cramMd5Digest("0Y7dDxxE7425Gd2dMp5927*S8jE7$C*U(hwkd_qF3&Q&q", "1(Qs6xfgM$M4)Uu8$7gHw/1pi&S7s1sT^um")
			).toEqual("f5cd66c54921a08e43a3f6897f7f54dc");
			expect(
				cramMd5Digest("nl#l910wr7s+2rn4+bAe)o(!N=sH2W2g3l8^#D!TU8ak^8*q)j8en2", "mrB1XAzz14iO9&8(1^jr8tj1sT3U/(9#0Rrf")
			).toEqual("bf219231c8411e0692cd283ece039114");
			expect(
				cramMd5Digest("xF6v2@87!2732Q$351w55_/3GQ2h2gORwcpK!&3dx", "5-@^4kM891@qtU^2wjq*BmGU1h1!DSal9yP5I7uMs")
			).toEqual("bb9a911259beb58e5b7a73d55c8abe3e");
			expect(
				cramMd5Digest("lf^_d)-d)81RFj21435f", "yt(*+H0s755tN32f(u@86uX0o7y3ARLq28D@K3_2q&50l))w3L)mthLgvi")
			).toEqual("f98bb3bc56a9c15563a273328106af82");
			expect(
				cramMd5Digest(
					"ZTIxNGE4MWNkfsZjgzMzI2OTZjMzE2ZDU1OWMxMDIzNzEyYTM2NjRhNTIZTIxNGE4MWNkM2ZiNzM4ZGZkYWQyN2MxOWE3MTM1MzQ",
					"E61F8DACCF78E6D810D2D28EADD0A5DB"
				)
			).toEqual("29f7b657595c58d9153e717848a94676");
		});
	});
});
