// composables/useSalaryCalculator.js

export function useSalaryCalculator() {
  const netSalaryCalculation = (line) => {
    if (line.isPrimary) {
      const netSalary = parseFloat(line.netSalary);
      let contribute = 0;
      let tax = 0;
      let grossSalary = 0;

      if (netSalary > 0 && netSalary <= 250) {
        contribute = parseFloat(((netSalary * 5) / 95).toFixed(2));
        line.employeeContribute = contribute;
        line.employerContribute = contribute;
        line.grossSalary = parseFloat((netSalary + contribute).toFixed(2));
        line.tax = 0;
      } else if (netSalary > 250 && netSalary <= 434) {
        tax = parseFloat((((netSalary - 250) * 8) / 92).toFixed(2));
        grossSalary = parseFloat((netSalary + tax).toFixed(2));
        contribute = parseFloat(((grossSalary * 5) / 95).toFixed(2));

        line.tax = tax;
        line.employeeContribute = contribute;
        line.employerContribute = contribute;
        line.grossSalary = parseFloat((grossSalary + contribute).toFixed(2));
      } else if (netSalary > 434) {
        tax = parseFloat((((netSalary - 434) * 10) / 90 + 16).toFixed(2));
        grossSalary = parseFloat((netSalary + tax).toFixed(2));
        contribute = parseFloat(((grossSalary * 5) / 95).toFixed(2));

        line.tax = tax;
        line.employeeContribute = contribute;
        line.employerContribute = contribute;
        line.grossSalary = parseFloat((grossSalary + contribute).toFixed(2));
      }
    } else {
      const netSalary = parseFloat(line.netSalary);
      let contribute = 0;
      let tax = 0;
      let grossSalary = 0;

      tax = parseFloat(((netSalary * 10) / 90).toFixed(2));
      grossSalary = parseFloat((netSalary + tax).toFixed(2));
      contribute = parseFloat(((grossSalary * 5) / 95).toFixed(2));

      line.tax = tax;
      line.employeeContribute = contribute;
      line.employerContribute = contribute;
      line.grossSalary = parseFloat((grossSalary + contribute).toFixed(2));
    }
  };

  const grossSalaryCalculation = (line) => {
    if(line.isPrimary){
      const grossSalary = parseFloat(line.grossSalary);
      let contribute = 0;
      let tax = 0;
      let netSalary = 0;
  
      if (grossSalary > 0 && grossSalary <= 250) {
        contribute = parseFloat(((grossSalary * 5) / 100).toFixed(2));
        line.employeeContribute = contribute;
        line.employerContribute = contribute;
        line.tax = 0;
        line.netSalary = parseFloat((grossSalary - contribute).toFixed(2));
      } else if (grossSalary > 250 && grossSalary <= 473.68) {
        contribute = parseFloat(((grossSalary * 5) / 100).toFixed(2));
        const taxable = parseFloat((grossSalary - contribute - 250).toFixed(2));
        tax = parseFloat(((taxable * 8) / 100).toFixed(2));
        netSalary = parseFloat((grossSalary - contribute - tax).toFixed(2));
  
        line.tax = tax;
        line.employeeContribute = contribute;
        line.employerContribute = contribute;
        line.netSalary = netSalary;
      } else if (grossSalary > 450) {
        contribute = parseFloat(((grossSalary * 5) / 100).toFixed(2));
        const taxable = parseFloat((grossSalary - contribute - 450).toFixed(2));
        tax = parseFloat(((taxable * 10) / 100 + 16).toFixed(2));
        netSalary = parseFloat((grossSalary - contribute - tax).toFixed(2));
  
        line.tax = tax;
        line.employeeContribute = contribute;
        line.employerContribute = contribute;
        line.netSalary = netSalary;
      }
    } else {
      const grossSalary = parseFloat(line.grossSalary);
      let contribute = 0;
      let tax = 0;
      let netSalary = 0;
  
      tax = parseFloat(((grossSalary * 10) / 100).toFixed(2));
      netSalary = parseFloat((grossSalary - tax).toFixed(2));
      contribute = parseFloat(((netSalary * 5) / 100).toFixed(2));
  
      line.tax = tax;
      line.employeeContribute = contribute;
      line.employerContribute = contribute;
      line.netSalary = netSalary-contribute;
    }
  };

  return {
    netSalaryCalculation,
    grossSalaryCalculation,
  };
}
