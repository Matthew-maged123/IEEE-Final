/**
 * Request-Readiness Assessment Engine (المحرك الذكي لفحص جاهزية الطلب)
 * Developed for UserSeif - IEEE Brand & Build Competition
 * Validates specifications, consistency, and completeness before submission.
 */

function assessRequestReadiness(data) {
  const checks = [];
  const category = (data.category || '').toLowerCase();
  const quantity = Number(data.quantity) || 0;
  const specs = data.specifications || {};
  const artwork = data.artwork || {};
  const contact = data.contactInfo || {};

  // 1. Basic Quantity Check
  if (quantity > 0) {
    checks.push({
      field: 'quantity',
      label: 'الكمية المطلوبة',
      status: 'pass',
      message: `الكمية المحددة: ${quantity} قطعة`,
    });
  } else {
    checks.push({
      field: 'quantity',
      label: 'الكمية المطلوبة',
      status: 'fail',
      message: 'يرجى تحديد كمية صحيحة أكبر من الصفر',
    });
  }

  // 2. Artwork / Design Needs Check
  const hasFiles = Array.isArray(artwork.files) && artwork.files.length > 0;
  const needsDesign = Boolean(artwork.needsDesignHelp);

  if (hasFiles) {
    checks.push({
      field: 'artwork',
      label: 'ملفات التصميم',
      status: 'pass',
      message: `تم إرفاق ${artwork.files.length} ملف/تصميم جاهز للطباعة`,
    });
  } else if (needsDesign) {
    checks.push({
      field: 'artwork',
      label: 'ملفات التصميم',
      status: 'pass',
      message: 'تم اختيار طلب المساعدة في إعداد التصميم من فريق يوزرسيف',
    });
  } else {
    checks.push({
      field: 'artwork',
      label: 'ملفات التصميم',
      status: 'fail',
      message: 'يرجى رفع ملف التصميم أو تحديد خيار (أحتاج مساعدة في التصميم)',
    });
  }

  // 3. Contact Information Check
  if (contact.name && contact.name.trim().length >= 2) {
    checks.push({
      field: 'contactName',
      label: 'اسم العميل',
      status: 'pass',
      message: 'اسم العميل مسجل',
    });
  } else {
    checks.push({
      field: 'contactName',
      label: 'اسم العميل',
      status: 'fail',
      message: 'يرجى إدخال اسم العميل للتواصل',
    });
  }

  const phoneRegex = /^01[0125][0-9]{8}$/;
  if (contact.phone && phoneRegex.test(contact.phone.trim())) {
    checks.push({
      field: 'contactPhone',
      label: 'رقم الهاتف / واتساب',
      status: 'pass',
      message: 'رقم هاتف صالح للتواصل والمتابعة عبر واتساب',
    });
  } else {
    checks.push({
      field: 'contactPhone',
      label: 'رقم الهاتف / واتساب',
      status: 'fail',
      message: 'يرجى إدخال رقم هاتف محمول مصري صحيح (مثال: 01116891025)',
    });
  }

  // 4. Category-Specific Validation
  if (category === 'clothing' || category === 'caps') {
    // Print Position Check
    if (specs.printPosition && specs.printPosition.trim().length > 0) {
      checks.push({
        field: 'printPosition',
        label: 'موضع الطباعة',
        status: 'pass',
        message: `موضع الطباعة المختار: ${specs.printPosition}`,
      });
    } else {
      checks.push({
        field: 'printPosition',
        label: 'موضع الطباعة',
        status: 'fail',
        message: 'يرجى تحديد موضع الطباعة (مثل: على الصدر، الظهر، الأكمام، الجيب)',
      });
    }

    // Color Check
    if (specs.color && specs.color.trim().length > 0) {
      checks.push({
        field: 'color',
        label: 'لون المنتج / القماش',
        status: 'pass',
        message: `اللون المختار: ${specs.color}`,
      });
    } else {
      checks.push({
        field: 'color',
        label: 'لون المنتج / القماش',
        status: 'fail',
        message: 'يرجى تحديد لون الخامة أو المنتج المطلوب',
      });
    }

    // Size Breakdown Consistency Check (for clothing)
    if (category === 'clothing') {
      const breakdown = specs.sizeBreakdown;
      if (breakdown && typeof breakdown === 'object') {
        const breakdownSum = Object.values(breakdown).reduce(
          (sum, val) => sum + (Number(val) || 0),
          0
        );

        if (breakdownSum === quantity) {
          checks.push({
            field: 'sizeBreakdown',
            label: 'توزيع المقاسات',
            status: 'pass',
            message: `مجموع المقاسات (${breakdownSum}) يطابق تماماً إجمالي الكمية المطلوبة`,
          });
        } else {
          checks.push({
            field: 'sizeBreakdown',
            label: 'توزيع المقاسات',
            status: 'fail',
            message: `مجموع تفصيل المقاسات (${breakdownSum}) لا يتطابق مع إجمالي الكمية (${quantity})`,
          });
        }
      } else {
        checks.push({
          field: 'sizeBreakdown',
          label: 'توزيع المقاسات',
          status: 'fail',
          message: 'يرجى تحديد تفصيل المقاسات المطلوبة (S, M, L, XL...)',
        });
      }
    }
  } else if (category === 'stickers' || category === 'labels') {
    // Dimensions Check
    const dims = specs.dimensions || {};
    if (dims.width > 0 && dims.height > 0) {
      checks.push({
        field: 'dimensions',
        label: 'أبعاد الملصق',
        status: 'pass',
        message: `الأبعاد: ${dims.width} × ${dims.height} ${dims.unit || 'سم'}`,
      });
    } else {
      checks.push({
        field: 'dimensions',
        label: 'أبعاد الملصق',
        status: 'fail',
        message: 'يرجى تحديد أبعاد الاستيكر (العرض والارتفاع ووحدة القياس)',
      });
    }

    // Shape Check
    if (specs.shape && specs.shape.trim().length > 0) {
      checks.push({
        field: 'shape',
        label: 'شكل القص والتقطيع',
        status: 'pass',
        message: `الشكل المختار: ${specs.shape}`,
      });
    } else {
      checks.push({
        field: 'shape',
        label: 'شكل القص والتقطيع',
        status: 'fail',
        message: 'يرجى اختيار شكل الاستيكر (دائري، مستطيل، Die-Cut مفرغ حسب الرسمة)',
      });
    }

    // Intended Use (Optional but recommended in brief)
    if (specs.intendedUse && specs.intendedUse.trim().length > 0) {
      checks.push({
        field: 'intendedUse',
        label: 'الاستخدام المقصود',
        status: 'pass',
        message: `الاستخدام المحدد: ${specs.intendedUse}`,
      });
    }
  } else if (category === 'phone-cases') {
    // Phone Model Check
    if (specs.phoneModel && specs.phoneModel.trim().length > 0) {
      checks.push({
        field: 'phoneModel',
        label: 'موديل الهاتف',
        status: 'pass',
        message: `موديل الهاتف: ${specs.phoneModel}`,
      });
    } else {
      checks.push({
        field: 'phoneModel',
        label: 'موديل الهاتف',
        status: 'fail',
        message: 'يرجى كتابة موديل الهاتف بالتحديد (مثال: iPhone 15 Pro أو Samsung A54)',
      });
    }

    // Brief requirement: "Do not show clothing-size fields"
    if (specs.sizeBreakdown && Object.keys(specs.sizeBreakdown).length > 0) {
      checks.push({
        field: 'sizeBreakdown',
        label: 'حقول مقاسات الملابس',
        status: 'warn',
        message: 'تم تجاهل حقول مقاسات الملابس لأنها لا تنطبق على كفرات الموبايل',
      });
    }
  } else if (category === 'mugs' || category === 'gifts') {
    // Personalization check
    if ((specs.personalizationText && specs.personalizationText.trim().length > 0) || hasFiles) {
      checks.push({
        field: 'personalization',
        label: 'بيانات التخصيص والطباعة',
        status: 'pass',
        message: 'تم تحديد نص التخصيص أو إرفاق التصميم المطلوب',
      });
    } else {
      checks.push({
        field: 'personalization',
        label: 'بيانات التخصيص والطباعة',
        status: 'fail',
        message: 'يرجى كتابة النص المطلوب طباعته أو إرفاق صورة التصميم',
      });
    }

    // Brief requirement: "Do not show clothing-size fields"
    if (specs.sizeBreakdown && Object.keys(specs.sizeBreakdown).length > 0) {
      checks.push({
        field: 'sizeBreakdown',
        label: 'حقول مقاسات الملابس',
        status: 'warn',
        message: 'تم تجاهل حقول مقاسات الملابس لأنها لا تنطبق على الهدايا والمجات',
      });
    }
  }

  // 5. Desired Date (Notice, not hard blocker - Page 05 requirement)
  if (data.desiredDate) {
    checks.push({
      field: 'desiredDate',
      label: 'الموعد المفضل للاستلام',
      status: 'pass',
      message: `الموعد المرغوب: ${data.desiredDate} (ملاحظة: الموعد هو رغبة مفضلة ويخضع لتأكيد صاحب العمل بعد فحص الطلب)`,
    });
  } else {
    checks.push({
      field: 'desiredDate',
      label: 'الموعد المفضل للاستلام',
      status: 'warn',
      message: 'لم يتم تحديد تاريخ مفضل - سيتم تحديد موعد التسليم بعد مراجعة الطلب من صاحب العمل',
    });
  }

  // Calculate Readiness Score
  const criticalChecks = checks.filter((c) => c.status !== 'warn');
  const passedChecks = criticalChecks.filter((c) => c.status === 'pass').length;
  const score = Math.round((passedChecks / criticalChecks.length) * 100);
  const isReady = criticalChecks.every((c) => c.status === 'pass');

  return {
    ready: isReady,
    score,
    passedCount: passedChecks,
    totalChecks: criticalChecks.length,
    checks,
    missingFields: checks.filter((c) => c.status === 'fail').map((c) => c.field),
  };
}

module.exports = { assessRequestReadiness };
